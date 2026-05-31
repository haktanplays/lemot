/**
 * Executable content contract validator (v0.1) — pure core.
 *
 * `validateContent` takes a fixture and returns findings. It does NOT read the
 * filesystem, print, or exit — that keeps it callable from a CLI script, a
 * debug screen, or a test. `formatReport` renders findings as readable text.
 *
 * Hard errors (severity "error") are the only blockers for now. The checks are
 * deliberately shallow on French itself — ownership is verified via item ids,
 * not by parsing sentences.
 */
import type { Finding, OperationId, ValidationInput } from "./types";

const PLACEHOLDER_RE = /\[_+\]|_{2,}/;

function hasPlaceholder(text: string | undefined): boolean {
  return text !== undefined && PLACEHOLDER_RE.test(text);
}

/**
 * Operations that require the learner to PRODUCE an answer. Recognition /
 * reveal-only steps are deliberately excluded — they show an item, they do not
 * require producing it.
 */
const PRODUCTION_OPERATIONS: ReadonlySet<OperationId> = new Set([
  "fill",
  "build",
  "register_switch",
  "context_chain",
]);

export function validateContent(input: ValidationInput): Finding[] {
  const findings: Finding[] = [];
  const { items, presets, contracts, exercises } = input;

  const knownItemIds = new Set(Object.keys(items));

  // ── Item-level checks ──────────────────────────────────────────────────
  for (const item of Object.values(items)) {
    // 2. invalid_preset
    if (!(item.preset in presets)) {
      findings.push({
        severity: "error",
        code: "invalid_preset",
        itemId: item.id,
        message: `Item "${item.id}" uses unknown preset "${item.preset}".`,
        suggestion: `Use one of: ${Object.keys(presets).join(", ")}.`,
      });
    }

    // 6. source_hygiene_blocked
    const hygiene = item.sourceHygiene;
    if (hygiene.disallowedDerivative || hygiene.reviewStatus === "blocked") {
      findings.push({
        severity: "error",
        code: "source_hygiene_blocked",
        itemId: item.id,
        message: `Item "${item.id}" is blocked by source hygiene (disallowedDerivative=${hygiene.disallowedDerivative}, reviewStatus="${hygiene.reviewStatus}").`,
        suggestion:
          "Replace with original content or clear the review before this item ships.",
      });
    }

    // 7. tts_audio_text_contains_placeholder (item audioText)
    const audioText = item.pronunciationProfile?.audioText;
    if (hasPlaceholder(audioText)) {
      findings.push({
        severity: "error",
        code: "tts_audio_text_contains_placeholder",
        itemId: item.id,
        message: `Item "${item.id}" audioText contains a placeholder: "${audioText}".`,
        suggestion: "TTS text must be a complete spoken string with no blanks.",
      });
    }
  }

  // ── Contract + exercise checks ─────────────────────────────────────────
  for (const contract of contracts) {
    const lessonId = contract.id;

    const owned = new Set<string>([
      ...contract.items.activeNew,
      ...contract.items.supported,
      ...contract.items.recognitionOnly,
      ...contract.items.recycled,
    ]);
    const recognitionOnly = new Set(contract.items.recognitionOnly);
    const allowedProduction = new Set(contract.production.allowedProduction);
    const blockedOperations = new Set(contract.production.blockedOperations);
    const allowedOperations = new Set(contract.production.allowedOperations);

    // 1. unknown_item_id (contract side)
    const referencedByContract = new Set<string>([
      ...owned,
      ...contract.production.allowedProduction,
      ...contract.production.blockedProduction,
    ]);
    for (const id of referencedByContract) {
      if (!knownItemIds.has(id)) {
        findings.push({
          severity: "error",
          code: "unknown_item_id",
          lessonId,
          itemId: id,
          message: `Contract "${lessonId}" references item "${id}", which is not in the item registry.`,
          suggestion: "Add the item to the registry or fix the id.",
        });
      }
    }

    for (const exercise of exercises.filter((e) => e.lessonId === lessonId)) {
      const isProductionOp = PRODUCTION_OPERATIONS.has(exercise.operation);

      // 4. blocked_operation_used
      if (blockedOperations.has(exercise.operation)) {
        findings.push({
          severity: "error",
          code: "blocked_operation_used",
          lessonId,
          exerciseId: exercise.id,
          message: `Exercise "${exercise.id}" uses operation "${exercise.operation}", which the contract blocks.`,
          suggestion: `Allowed operations: ${contract.production.allowedOperations.join(
            ", "
          )}.`,
        });
      } else if (!allowedOperations.has(exercise.operation)) {
        // Not blocked, but also not explicitly allowed — surface, don't fail.
        findings.push({
          severity: "info",
          code: "operation_not_declared_allowed",
          lessonId,
          exerciseId: exercise.id,
          message: `Exercise "${exercise.id}" uses operation "${exercise.operation}", which is neither allowed nor blocked by the contract.`,
          suggestion:
            "Add it to allowedOperations or blockedOperations to be explicit.",
        });
      }

      for (const id of exercise.targetItemIds) {
        // 1. unknown_item_id (exercise side)
        if (!knownItemIds.has(id)) {
          findings.push({
            severity: "error",
            code: "unknown_item_id",
            lessonId,
            exerciseId: exercise.id,
            itemId: id,
            message: `Exercise "${exercise.id}" targets item "${id}", which is not in the item registry.`,
            suggestion: "Add the item to the registry or fix the id.",
          });
          continue;
        }
        // 3. recognition_only_used_as_production_target — only meaningful for
        // production-like operations. Recognition/reveal steps may legitimately
        // show a recognition-only item without requiring its production.
        if (isProductionOp && recognitionOnly.has(id)) {
          findings.push({
            severity: "error",
            code: "recognition_only_used_as_production_target",
            lessonId,
            exerciseId: exercise.id,
            itemId: id,
            message: `Exercise "${exercise.id}" uses recognition-only item "${id}" as a production target.`,
            suggestion:
              "Recognition-only items may be shown, not required as answers.",
          });
        } else if (!owned.has(id)) {
          // 5. target_answer_contains_unowned_item
          findings.push({
            severity: "error",
            code: "target_answer_contains_unowned_item",
            lessonId,
            exerciseId: exercise.id,
            itemId: id,
            message: `Exercise "${exercise.id}" targets item "${id}", which lesson "${lessonId}" does not own.`,
            suggestion:
              "Declare the item in the lesson contract, or remove it from the target.",
          });
        } else if (isProductionOp && !allowedProduction.has(id)) {
          // 8. target_answer_not_in_allowed_production
          // The item is owned and production-capable, but this production-like
          // exercise requires producing it without it being declared in
          // production.allowedProduction. Recognition/reveal-only steps are
          // exempt (isProductionOp is false for them).
          findings.push({
            severity: "error",
            code: "target_answer_not_in_allowed_production",
            lessonId,
            exerciseId: exercise.id,
            itemId: id,
            message: `Exercise "${exercise.id}" (operation "${exercise.operation}", target "${exercise.targetText ?? id}") requires producing item "${id}", which is not in production.allowedProduction.`,
            suggestion:
              "Add the item to production.allowedProduction, or change the exercise so it does not require producing it.",
          });
        }
      }

      // 7. tts_audio_text_contains_placeholder (revealed / spoken exercise text)
      const spoken = [
        exercise.targetText,
        exercise.directForm,
        exercise.politeForm,
        ...(exercise.steps?.map((s) => s.answer) ?? []),
      ];
      for (const text of spoken) {
        if (hasPlaceholder(text)) {
          findings.push({
            severity: "error",
            code: "tts_audio_text_contains_placeholder",
            lessonId,
            exerciseId: exercise.id,
            message: `Exercise "${exercise.id}" has a revealed/TTS string with a placeholder: "${text}".`,
            suggestion: "Revealed answers and TTS text must be complete strings.",
          });
        }
      }
    }
  }

  return findings;
}

function formatFinding(finding: Finding): string {
  const location = [
    finding.lessonId ? `lesson=${finding.lessonId}` : null,
    finding.exerciseId ? `exercise=${finding.exerciseId}` : null,
    finding.itemId ? `item=${finding.itemId}` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const head = `  [${finding.severity}] ${finding.code}${
    location ? ` (${location})` : ""
  }`;
  const lines = [head, `      ${finding.message}`];
  if (finding.suggestion) {
    lines.push(`      ↳ ${finding.suggestion}`);
  }
  return lines.join("\n");
}

export function formatReport(findings: Finding[]): string {
  const errors = findings.filter((f) => f.severity === "error");
  const warnings = findings.filter((f) => f.severity === "warning");
  const infos = findings.filter((f) => f.severity === "info");

  const out: string[] = [
    "Content validation report",
    `Hard errors: ${errors.length}`,
    `Warnings: ${warnings.length}`,
    `Info: ${infos.length}`,
  ];

  const section = (title: string, group: Finding[]): void => {
    if (group.length === 0) return;
    out.push("", `${title}:`);
    for (const finding of group) out.push(formatFinding(finding));
  };

  section("Hard errors", errors);
  section("Warnings", warnings);
  section("Info", infos);

  return out.join("\n");
}
