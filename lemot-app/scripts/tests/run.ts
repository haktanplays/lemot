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
import "./privacy.test";
import "./privacyLocal.test";
import "./privacyData.test";
import "./mastery.test";
import "./localRepository.test";
import "./buildSequence.test";
import { runAll } from "./harness";

void runAll();
