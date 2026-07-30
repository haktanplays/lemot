/**
 * Permanent learning-engine test runner.
 *
 * Run:
 *   npm run test:learning-engine
 *
 * Importing each `*.test` module registers its tests (synchronous `describe`
 * blocks); `runAll` then executes them and exits non-zero on any failure. Pure
 * Node/tsx — every storage-touching module is exercised through an injected
 * in-memory adapter, so NO React Native / Expo / device layer is loaded.
 */
import "./gateBootstrap.test";
import "./privacy.test";
import "./privacyLocal.test";
import "./privacyData.test";
import "./localPrivacyCompleteness.test";
import "./privacyResetBarrier.test";
import "./cloudEraseGuard.test";
import "./deleteSyncedData.test";
import "./syncGeneration.test";
import "./remoteEraseRecovery.test";
import "./localLearnerData.test";
import "./learnerMutationGate.test";
import "./remoteEraseConfirm.test";
import "./generationMismatch.test";
import "./operationId.test";
import "./generationReconcile.test";
import "./pinnedDelete.test";
import "./pinnedWrite.test";
import "./singleFlight.test";
import "./deleteSyncedDataWiring.test";
import "./mastery.test";
import "./safeStorage.test";
import "./blobStore.test";
import "./secureAuthStorage.test";
import "./aiContract.test";
import "./reviewScore.test";
import "./contextChainAdvance.test";
import "./localRepository.test";
import "./buildSequence.test";
import "./lessonProgress.test";
import "./ttsPlaceholder.test";
import "./devApkScope.test";
import "./devApkCopyGuard.test";
import "./componentCopyGuard.test";
import "./productStageResolution.test";
import "./gradeAnswerCheck.test";
import "./weaveMatch.test";
import "./weaveCopy.test";
import "./lessonZeroAnswers.test";
import "./boundaryAndDue.test";
import "./selectors.test";
import "./noSupabaseAuthGuard.test";
import "./v1LessonStructure.test";
import "./shippedItemIds.test";
import "./shippedErrorTags.test";
import "./canonRules.test";
import "./errorEngine.test";
import "./lexiqueMemory.test";
import "./carryoverSelector.test";
import "./telemetry.test";
import "./compaction.test";
import "./migrations.test";
import "./deriveDrill.test";
import "./deriveFillBoundary.test";
import "./contextChainMasteryWeight.test";
import "./practiceSelector.test";
import "./nearMissMasteryTiming.test";
import { runAll } from "./harness";

void runAll();
