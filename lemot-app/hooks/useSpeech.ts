import * as Speech from "expo-speech";

/**
 * French text-to-speech hook using expo-speech.
 * Replaces Web Speech API from the web version.
 */
export function useSpeech() {
  const say = (text: string) => {
    const clean = text
      .replace(
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu,
        ""
      )
      .replace(/\[_+\]/g, " ")
      .replace(/_{2,}/g, " ")
      .replace(/\s+([,.!?;:])/g, "$1")
      .replace(/\s{2,}/g, " ")
      .trim();

    if (!clean) return;

    Speech.stop();
    Speech.speak(clean, {
      language: "fr-FR",
      rate: 0.85,
    });
  };

  const stop = () => {
    Speech.stop();
  };

  return { say, stop };
}
