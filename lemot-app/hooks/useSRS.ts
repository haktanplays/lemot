import { useState, useEffect, useCallback } from "react";
import { kvStorage } from "@/lib/storage";

/**
 * Simple Leitner-style SRS (Spaced Repetition System)
 *
 * 5 boxes with increasing intervals:
 *   Box 0: New — review immediately
 *   Box 1: Learning — review after 1 day
 *   Box 2: Familiar — review after 3 days
 *   Box 3: Known — review after 7 days
 *   Box 4: Mastered — review after 30 days
 *
 * "Know It" → move up one box
 * "Still Learning" → reset to box 0
 */

const SRS_KEY = "lm7_srs";

const INTERVALS = [0, 1, 3, 7, 30]; // days per box

export interface SRSCard {
  id: string; // unique card identifier
  box: number; // 0-4
  lastReview: number; // timestamp
  nextReview: number; // timestamp
}

export type SRSData = Record<string, SRSCard>;

function getDayTimestamp(daysFromNow: number): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + daysFromNow);
  return d.getTime();
}

function todayStart(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function useSRS() {
  const [data, setData] = useState<SRSData>({});
  const [loaded, setLoaded] = useState(false);

  // Load
  useEffect(() => {
    (async () => {
      try {
        const raw = await kvStorage.getItem(SRS_KEY);
        if (raw) setData(JSON.parse(raw));
      } catch (e) {
        console.warn("[SRS] Load failed:", e);
      }
      setLoaded(true);
    })();
  }, []);

  // Save
  const save = useCallback(async (newData: SRSData) => {
    try {
      await kvStorage.setItem(SRS_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn("[SRS] Save failed:", e);
    }
  }, []);

  // Mark card as known — move up one box
  const markKnown = useCallback(
    (cardId: string) => {
      setData((prev) => {
        const card = prev[cardId] || {
          id: cardId,
          box: 0,
          lastReview: 0,
          nextReview: 0,
        };
        const newBox = Math.min(card.box + 1, 4);
        const updated = {
          ...prev,
          [cardId]: {
            id: cardId,
            box: newBox,
            lastReview: Date.now(),
            nextReview: getDayTimestamp(INTERVALS[newBox]),
          },
        };
        save(updated);
        return updated;
      });
    },
    [save]
  );

  // Mark card as still learning — reset to box 0
  const markLearning = useCallback(
    (cardId: string) => {
      setData((prev) => {
        const updated = {
          ...prev,
          [cardId]: {
            id: cardId,
            box: 0,
            lastReview: Date.now(),
            nextReview: getDayTimestamp(0), // review again today
          },
        };
        save(updated);
        return updated;
      });
    },
    [save]
  );

  // Get cards that are due for review (nextReview <= today)
  const getDueCards = useCallback(
    (allCardIds: string[]): string[] => {
      const today = todayStart();
      return allCardIds
        .filter((id) => {
          const card = data[id];
          if (!card) return true; // new card, always due
          return card.nextReview <= today;
        })
        .sort((a, b) => {
          const cardA = data[a];
          const cardB = data[b];
          // New cards first, then by box (lower first), then by nextReview
          if (!cardA) return -1;
          if (!cardB) return 1;
          if (cardA.box !== cardB.box) return cardA.box - cardB.box;
          return cardA.nextReview - cardB.nextReview;
        });
    },
    [data]
  );

  // Get card stats
  const getStats = useCallback(
    (allCardIds: string[]) => {
      let newCount = 0;
      let learning = 0;
      let familiar = 0;
      let known = 0;
      let mastered = 0;

      allCardIds.forEach((id) => {
        const card = data[id];
        if (!card) {
          newCount++;
        } else {
          switch (card.box) {
            case 0:
              learning++;
              break;
            case 1:
              learning++;
              break;
            case 2:
              familiar++;
              break;
            case 3:
              known++;
              break;
            case 4:
              mastered++;
              break;
          }
        }
      });

      return { new: newCount, learning, familiar, known, mastered };
    },
    [data]
  );

  return {
    srsData: data,
    srsLoaded: loaded,
    markKnown,
    markLearning,
    getDueCards,
    getStats,
  };
}
