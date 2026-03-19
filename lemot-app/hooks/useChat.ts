import { useState, useRef, useCallback } from "react";
import { sendAIMessage, buildChatSystem } from "@/lib/ai";

const MSG_LIMIT = 15;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function useChat() {
  const [chatMsgs, setChatMsgs] = useState<ChatMessage[]>([]);
  const [chatIn, setChatIn] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMode, setChatMode] = useState("free");
  const [chatScenario, setChatScenario] = useState<string | null>(null);
  const [chatMsgCount, setChatMsgCount] = useState(0);
  const chatRef = useRef<any>(null);

  const sendChat = useCallback(async () => {
    if (!chatIn.trim() || chatLoading || chatMsgCount >= MSG_LIMIT) return;

    const userMsg: ChatMessage = { role: "user", content: chatIn.trim() };
    const newMsgs = [...chatMsgs, userMsg];

    setChatMsgs(newMsgs);
    setChatIn("");
    setChatLoading(true);
    setChatMsgCount((c) => c + 1);

    const system = buildChatSystem(chatMode, chatScenario ?? undefined);
    const reply = await sendAIMessage(newMsgs, system);

    setChatMsgs((prev) => [...prev, { role: "assistant", content: reply }]);
    setChatLoading(false);
  }, [chatIn, chatLoading, chatMsgCount, chatMsgs, chatMode, chatScenario]);

  const resetChat = useCallback(() => {
    setChatMsgs([]);
    setChatIn("");
    setChatScenario(null);
    setChatMsgCount(0);
  }, []);

  const startChat = useCallback(
    (mode: string, starter: string, scenario?: string) => {
      setChatMsgs([{ role: "assistant", content: starter }]);
      setChatIn("");
      setChatMode(mode);
      setChatScenario(scenario ?? null);
      setChatMsgCount(0);
    },
    []
  );

  return {
    chatMsgs,
    chatIn,
    setChatIn,
    chatLoading,
    chatMode,
    setChatMode,
    chatScenario,
    setChatScenario,
    chatMsgCount,
    chatRef,
    sendChat,
    resetChat,
    startChat,
    MSG_LIMIT,
  };
}
