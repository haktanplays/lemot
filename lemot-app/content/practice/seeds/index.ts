/**
 * The static L1-L10 practice pool.
 *
 * Order is lesson order, and it is load-bearing: the planner breaks every tie
 * on pool position, so a stable order is what makes the same learner state
 * produce the same session twice.
 */
import type { PracticeSeed } from "../practiceTypes";
import { L1_SEEDS } from "./l01";
import { L2_SEEDS } from "./l02";
import { L3_SEEDS } from "./l03";
import { L4_SEEDS } from "./l04";
import { L5_SEEDS } from "./l05";
import { L6_SEEDS } from "./l06";
import { L7_SEEDS } from "./l07";
import { L8_SEEDS } from "./l08";
import { L9_SEEDS } from "./l09";
import { L10_SEEDS } from "./l10";

export const PRACTICE_SEEDS: readonly PracticeSeed[] = [
  ...L1_SEEDS,
  ...L2_SEEDS,
  ...L3_SEEDS,
  ...L4_SEEDS,
  ...L5_SEEDS,
  ...L6_SEEDS,
  ...L7_SEEDS,
  ...L8_SEEDS,
  ...L9_SEEDS,
  ...L10_SEEDS,
];
