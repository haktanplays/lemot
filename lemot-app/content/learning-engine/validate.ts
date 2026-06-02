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
import type {
  Finding,
  ItemId,
  OperationId,
  ValidationInput,
} from "./types";
import { buildItemGraph } from "./graph";

const PLACEHOLDER_RE = /\[_+\]|_{2,}/;

function hasPlaceholder(text: string | undefined): boolean {
  return text !== undefined && PLACEHOLDER_RE.test(text);
}

/**
 * Build-only reconstruction normalization: case / accent / whitespace AND
 * internal-punctuation insensitive. DISTINCT from answer-check.normalizeAnswer
 * (which preserves internal punctuation) — used ONLY to verify a build's answer
 * tiles reconstruct its targetText, never to grade a learner's typed answer.
 * Lets "Bonjour je voudrais un café" match targetText "Bonjour, je voudrais un café".
 */
const BUILD_PUNCT_RE = /[.,;:!?…'’‘ʼ´"«»()\-]/g;
function normalizeForBuild(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(BUILD_PUNCT_RE, " ")
    .replace(/\s+/g, " ")
    .trim();
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

/**
 * Buckets whose items the learner is expected to PRODUCE. A recognition-only
 * default item must never sit here. (`recognitionOnly` and `recycled` buckets
 * are non-production and are not checked for this.)
 */
const PRODUCTION_BUCKETS = ["activeNew", "supported"] as const;

export function validateContent(input: ValidationInput): Finding[] {
  const findings: Finding[] = [];
  const { items, presets, contracts, exercises } = input;

  const knownItemIds = new Set(Object.keys(items));

  // ── Fixture-wiring checks (structural — run BEFORE the per-contract loop) ──
  // The per-contract loop below filters exercises by lessonId, so an exercise
  // whose lessonId has no matching contract would be silently skipped (its
  // targets / operations never validated). These checks fail loudly on that and
  // on duplicate contract / exercise ids.
  const contractIds = new Set<string>();
  for (const contract of contracts) {
    if (contractIds.has(contract.id)) {
      findings.push({
        severity: "error",
        code: "duplicate_contract_id",
        lessonId: contract.id,
        message: `Contract id "${contract.id}" is defined more than once in the validation input.`,
        suggestion:
          "Each lesson contract id must be unique. Remove or rename the duplicate.",
      });
    } else {
      contractIds.add(contract.id);
    }
  }

  const seenExerciseIds = new Set<string>();
  for (const exercise of exercises) {
    if (seenExerciseIds.has(exercise.id)) {
      findings.push({
        severity: "error",
        code: "duplicate_exercise_id",
        lessonId: exercise.lessonId,
        exerciseId: exercise.id,
        message: `Exercise id "${exercise.id}" is defined more than once in the validation input.`,
        suggestion:
          "Each exercise id must be unique. Remove or rename the duplicate.",
      });
    } else {
      seenExerciseIds.add(exercise.id);
    }
    if (!contractIds.has(exercise.lessonId)) {
      findings.push({
        severity: "error",
        code: "exercise_without_contract",
        lessonId: exercise.lessonId,
        exerciseId: exercise.id,
        message: `Exercise "${exercise.id}" has lessonId "${exercise.lessonId}", which has no matching contract — it would be silently skipped by validation.`,
        suggestion:
          "Add a contract with this id, or fix the exercise's lessonId.",
      });
    }
  }

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
    const blockedProduction = new Set(contract.production.blockedProduction);
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

    // ── Contract consistency checks ──────────────────────────────────────
    // item_bucket_overlap — an item must live in exactly one ownership bucket.
    const bucketsOf = new Map<ItemId, string[]>();
    const allBuckets: [string, ItemId[]][] = [
      ["activeNew", contract.items.activeNew],
      ["supported", contract.items.supported],
      ["recognitionOnly", contract.items.recognitionOnly],
      ["recycled", contract.items.recycled],
    ];
    for (const [bucketName, ids] of allBuckets) {
      for (const id of ids) {
        const seen = bucketsOf.get(id);
        if (seen) seen.push(bucketName);
        else bucketsOf.set(id, [bucketName]);
      }
    }
    for (const [id, buckets] of bucketsOf) {
      if (buckets.length > 1) {
        findings.push({
          severity: "error",
          code: "item_bucket_overlap",
          lessonId,
          itemId: id,
          message: `Item "${id}" appears in multiple ownership buckets: ${buckets.join(
            ", "
          )}.`,
          suggestion: "Place each item in exactly one ownership bucket.",
        });
      }
    }

    // allowed_production_not_owned / blocked_production_not_owned — production
    // lists may only reference items the lesson owns. Unknown ids are already
    // covered by unknown_item_id, so only known-but-unowned ids are flagged here
    // (avoids double-reporting).
    for (const id of contract.production.allowedProduction) {
      if (knownItemIds.has(id) && !owned.has(id)) {
        findings.push({
          severity: "error",
          code: "allowed_production_not_owned",
          lessonId,
          itemId: id,
          message: `production.allowedProduction lists "${id}", which lesson "${lessonId}" does not own (not in any ownership bucket).`,
          suggestion:
            "Declare the item in an ownership bucket, or remove it from allowedProduction.",
        });
      }
    }
    for (const id of contract.production.blockedProduction) {
      if (knownItemIds.has(id) && !owned.has(id)) {
        findings.push({
          severity: "error",
          code: "blocked_production_not_owned",
          lessonId,
          itemId: id,
          message: `production.blockedProduction lists "${id}", which lesson "${lessonId}" does not own (not in any ownership bucket).`,
          suggestion:
            "Declare the item in an ownership bucket, or remove it from blockedProduction.",
        });
      }
    }

    // production_allow_block_overlap — an item must not sit in BOTH
    // allowedProduction and blockedProduction: the two lists contradict each
    // other (one permits producing the item, the other forbids it). Iterating
    // the deduped allowedProduction Set reports each overlapping id once.
    for (const id of allowedProduction) {
      if (blockedProduction.has(id)) {
        findings.push({
          severity: "error",
          code: "production_allow_block_overlap",
          lessonId,
          itemId: id,
          message: `Item "${id}" is listed in BOTH production.allowedProduction and production.blockedProduction for lesson "${lessonId}".`,
          suggestion:
            "An item cannot be both allowed and blocked from production. Remove it from one of the two lists.",
        });
      }
    }

    // preset_contract_ownership_mismatch — preset defaultOwnership is a DEFAULT,
    // overridable per lesson, so ordinary active↔supported carry-in is NOT
    // flagged. The one dangerous case remains a hard error: a recognition-only
    // default item must never sit in a production bucket (activeNew / supported).
    for (const bucket of PRODUCTION_BUCKETS) {
      for (const id of contract.items[bucket]) {
        const item = items[id];
        if (!item) continue; // unknown_item_id covers a missing registry entry
        const preset = presets[item.preset];
        if (!preset) continue; // invalid_preset covers an unknown preset
        if (preset.defaultOwnership !== "recognitionOnly") continue;
        findings.push({
          severity: "error",
          code: "preset_contract_ownership_mismatch",
          lessonId,
          itemId: id,
          message: `Item "${id}" preset "${item.preset}" is recognition-only by default but is placed in the production bucket "${bucket}".`,
          suggestion:
            "A recognition-only item must not sit in a production bucket. Move it to recognitionOnly, or change its preset.",
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
        } else if (isProductionOp && blockedProduction.has(id)) {
          // blocked_production_used_as_target — a production-like exercise must
          // not require producing an item the contract explicitly blocks.
          // Recognition / reveal steps are exempt (isProductionOp is false).
          // This is the DIRECT signal; placed before the generic
          // target_answer_not_in_allowed_production so a blocked-but-owned
          // target reports its real reason ("blocked") rather than the weaker
          // "not in allowedProduction".
          findings.push({
            severity: "error",
            code: "blocked_production_used_as_target",
            lessonId,
            exerciseId: exercise.id,
            itemId: id,
            message: `Exercise "${exercise.id}" (operation "${exercise.operation}") requires producing item "${id}", which lesson "${lessonId}" lists in production.blockedProduction.`,
            suggestion:
              "Remove the item from production.blockedProduction, or change the exercise so it does not require producing it.",
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
      const spoken: (string | undefined)[] = [exercise.targetText];
      if (exercise.operation === "register_switch") {
        spoken.push(exercise.directForm, exercise.politeForm);
      }
      if (exercise.operation === "context_chain") {
        spoken.push(...exercise.steps.map((s) => s.answer));
      }
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

      // ── build-tile checks (only when a build carries explicit tiles) ────
      if (exercise.operation === "build" && exercise.tiles) {
        const tiles = exercise.tiles;
        const answerTiles = tiles.filter((t) => t.answerIndex !== undefined);
        const distractorTiles = tiles.filter(
          (t) => t.answerIndex === undefined
        );
        const answerItemIds = new Set(answerTiles.map((t) => t.itemId));
        const targetSet = new Set(exercise.targetItemIds);

        // 1. answer tile item ids must equal targetItemIds (as a set).
        const sameMembers =
          answerItemIds.size === targetSet.size &&
          [...answerItemIds].every((id) => targetSet.has(id));
        if (!sameMembers) {
          findings.push({
            severity: "error",
            code: "build_answer_tiles_mismatch_target",
            lessonId,
            exerciseId: exercise.id,
            message: `Build "${exercise.id}" answer tiles {${[
              ...answerItemIds,
            ].join(", ")}} do not match targetItemIds {${exercise.targetItemIds.join(
              ", "
            )}}.`,
            suggestion:
              "Answer tiles (those with answerIndex) must be exactly the items in targetItemIds.",
          });
        }

        // 2. answerIndex values must be a contiguous 0..n-1 permutation.
        const indices = answerTiles
          .map((t) => t.answerIndex as number)
          .sort((a, b) => a - b);
        const contiguous = indices.every((v, i) => v === i);
        if (!contiguous) {
          findings.push({
            severity: "error",
            code: "build_answer_index_invalid",
            lessonId,
            exerciseId: exercise.id,
            message: `Build "${exercise.id}" answerIndex values [${answerTiles
              .map((t) => t.answerIndex)
              .join(", ")}] are not a contiguous 0..${
              answerTiles.length - 1
            } sequence.`,
            suggestion: "Number answer tiles 0,1,2,… with no gaps or duplicates.",
          });
        }

        // 3. answer tiles must reconstruct targetText (build-normalized). Only
        //    checked once the answer set + ordering are themselves valid.
        if (exercise.targetText !== undefined && contiguous && sameMembers) {
          const reconstructed = answerTiles
            .slice()
            .sort(
              (a, b) => (a.answerIndex as number) - (b.answerIndex as number)
            )
            .map((t) => items[t.itemId]?.text.fr ?? "")
            .join(" ");
          if (
            normalizeForBuild(reconstructed) !==
            normalizeForBuild(exercise.targetText)
          ) {
            findings.push({
              severity: "error",
              code: "build_reconstruction_mismatch",
              lessonId,
              exerciseId: exercise.id,
              message: `Build "${exercise.id}" answer tiles reconstruct "${reconstructed}", which does not match targetText "${exercise.targetText}" (build-normalized).`,
              suggestion:
                "Fix tile order/items so the assembled tiles reproduce targetText.",
            });
          }
        }

        // 4. distractors must be safe: known, owned, not recognition-only, not
        //    an error_pattern item, not blocked, and not also an answer item.
        for (const tile of distractorTiles) {
          const id = tile.itemId;
          const reasons: string[] = [];
          if (!knownItemIds.has(id)) reasons.push("unknown");
          else if (!owned.has(id)) reasons.push("not owned by lesson");
          if (recognitionOnly.has(id)) reasons.push("recognition-only");
          if (id.startsWith("error_pattern:")) reasons.push("error_pattern item");
          if (blockedProduction.has(id)) reasons.push("blocked from production");
          if (answerItemIds.has(id)) reasons.push("also an answer item");
          if (reasons.length > 0) {
            findings.push({
              severity: "error",
              code: "build_distractor_not_allowed",
              lessonId,
              exerciseId: exercise.id,
              itemId: id,
              message: `Build "${exercise.id}" distractor "${id}" is not allowed: ${reasons.join(
                "; "
              )}.`,
              suggestion:
                "Use a distractor the lesson owns and may produce (active / supported / recycled) — never recognition-only, error_pattern, blocked, or an answer item.",
            });
          }
        }
      }
    }
  }

  // ── Graph-dependent audit (P0.2) ──────────────────────────────────────────
  // Defense-in-depth over the per-contract target checks above, driven by the
  // derived item/lesson graph (./graph.ts). PRODUCTION operations only —
  // recognition / reveal steps are exempt (they may show an item without
  // requiring its production). These intentionally OVERLAP the more specific
  // per-contract findings (recognition_only_used_as_production_target /
  // blocked_production_used_as_target / target_answer_contains_unowned_item): the
  // graph view is a backstop, so a genuinely bad target may surface both its
  // specific finding and a graph finding. With the conservative P0.2 definitions
  // (no cross-lesson ordering inference) these checks are strict backstops, so on
  // a clean fixture they add nothing and the aggregate stays 0/0/0. The two NEW
  // codes are mutually exclusive per (exercise, item): `unsafe` is checked first,
  // and a flagged target is not also reported as `unseen`.
  const graph = buildItemGraph(input);
  for (const contract of contracts) {
    const lessonId = contract.id;
    const lessonNode = graph.lessons[lessonId];
    if (!lessonNode) continue;

    const recognitionOnlyHere = new Set(lessonNode.recognitionOnly);
    const blockedHere = new Set(lessonNode.blockedProduction);
    // Reachable for this lesson (conservative, per-lesson — NO numeric ordering):
    // owned in any of the four buckets, first-introduced here, or ownedIn graph set.
    const reachableHere = new Set<string>([
      ...lessonNode.activeNew,
      ...lessonNode.supported,
      ...lessonNode.recycled,
      ...lessonNode.recognitionOnly,
    ]);

    for (const exercise of exercises.filter((e) => e.lessonId === lessonId)) {
      if (!PRODUCTION_OPERATIONS.has(exercise.operation)) continue;
      for (const id of exercise.targetItemIds) {
        // Unknown ids are covered by unknown_item_id; the graph audit stays quiet.
        if (!knownItemIds.has(id)) continue;
        const itemNode = graph.items[id];

        const unsafe =
          recognitionOnlyHere.has(id) ||
          blockedHere.has(id) ||
          (itemNode?.recognitionOnlyIn.includes(lessonId) ?? false) ||
          (itemNode?.blockedProductionIn.includes(lessonId) ?? false);
        if (unsafe) {
          findings.push({
            severity: "error",
            code: "unsafe_production_target",
            lessonId,
            exerciseId: exercise.id,
            itemId: id,
            message: `Exercise "${exercise.id}" (operation "${exercise.operation}") targets item "${id}", which the graph shows is recognition-only / blocked for lesson "${lessonId}" — it must not be a production target.`,
            suggestion:
              "Recognition-only / blocked forms may be shown, not required as answers. Produce only owned, allowed items.",
          });
          continue; // unsafe and unseen are mutually exclusive — prefer the safety signal.
        }

        const reachable =
          reachableHere.has(id) ||
          itemNode?.firstIntroducedIn === lessonId ||
          (itemNode?.ownedIn.includes(lessonId) ?? false);
        if (!reachable) {
          findings.push({
            severity: "error",
            code: "unseen_form_used",
            lessonId,
            exerciseId: exercise.id,
            itemId: id,
            message: `Exercise "${exercise.id}" (operation "${exercise.operation}") requires producing item "${id}", which is not reachable for lesson "${lessonId}" (not owned here and not first-introduced here).`,
            suggestion:
              "Declare the item in the lesson contract (an ownership bucket), or remove it from the production target.",
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
