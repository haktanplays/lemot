import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Send, Volume2, Check } from "lucide-react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import { sendMiniConv } from "@/lib/ai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MiniConversationProps {
  topic: string;
  starter: string;
  onComplete: () => void;
  say: (text: string) => void;
}

/**
 * Section 9: Mini Conversation
 *
 * A 3-4 turn AI chat locked to the lesson topic.
 * The AI uses negotiation of meaning (rephrasing errors naturally
 * rather than correcting directly). Listen button on each AI message.
 */
export function MiniConversation({
  topic,
  starter,
  onComplete,
  say,
}: MiniConversationProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: starter },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const userTurnCount = messages.filter((m) => m.role === "user").length;
  const canFinish = userTurnCount >= 3;

  /** Scroll to bottom when messages change */
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, loading]);

  /** Send a user message and get AI response */
  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMiniConv(updated, topic);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ah, un petit probleme technique. Continuons !",
        },
      ]);
    }
    setLoading(false);
  }

  return (
    <View className="flex-1">
      {/* Header */}
      <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
        Mini Conversation
      </Text>
      <Text className="text-xs mb-3" style={{ color: P.ink2 }}>
        Chat in French --{" "}
        {canFinish
          ? "you can finish anytime!"
          : `${3 - userTurnCount} more turn${3 - userTurnCount !== 1 ? "s" : ""} to go`}
      </Text>

      {/* Messages container */}
      <View
        className="rounded-2xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 16,
          flex: 1,
          maxHeight: 360,
        }}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((m, i) => (
            <View
              key={i}
              className="mb-2"
              style={{
                flexDirection: "row",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <View
                style={{
                  maxWidth: "80%",
                  padding: 12,
                  borderRadius: 14,
                  borderBottomRightRadius: m.role === "user" ? 4 : 14,
                  borderBottomLeftRadius: m.role === "assistant" ? 4 : 14,
                  backgroundColor:
                    m.role === "user" ? P.red : "#F0F9FF",
                }}
              >
                <Text
                  className="text-sm"
                  style={{
                    fontFamily: "serif",
                    lineHeight: 22,
                    color: m.role === "user" ? "#fff" : P.ink,
                  }}
                >
                  {m.content}
                </Text>

                {/* Listen button on AI messages */}
                {m.role === "assistant" && (
                  <Pressable
                    onPress={() => say(m.content)}
                    className="flex-row items-center mt-1"
                    style={{ gap: 3 }}
                  >
                    <Volume2 size={12} color="#0369A1" strokeWidth={1.5} />
                    <Text className="text-xs" style={{ color: "#0369A1" }}>
                      Listen
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))}

          {/* Loading indicator */}
          {loading && (
            <View
              className="mb-2"
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 14,
                  borderBottomLeftRadius: 4,
                  backgroundColor: "#F0F9FF",
                }}
              >
                <ActivityIndicator size="small" color={P.ink3} />
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Input area */}
      <View
        className="flex-row items-center mt-2.5"
        style={{ gap: 8 }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Write in French..."
          placeholderTextColor={P.ink3}
          editable={!loading}
          onSubmitEditing={handleSend}
          returnKeyType="send"
          className="flex-1 rounded-xl"
          style={{
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderWidth: 1.5,
            borderColor: P.border,
            fontFamily: "serif",
            fontSize: 14,
            color: P.ink,
            backgroundColor: P.paper,
          }}
        />
        <Pressable
          onPress={handleSend}
          disabled={!input.trim() || loading}
          className="rounded-xl items-center justify-center"
          style={{
            width: 44,
            height: 44,
            backgroundColor:
              input.trim() && !loading ? P.red : P.border,
          }}
        >
          <Send size={16} color="#fff" strokeWidth={1.5} />
        </Pressable>
      </View>

      {/* Finish button */}
      {canFinish && (
        <Btn onPress={onComplete} color={P.green}>
          <Text className="text-white text-sm font-semibold">
            Finish Conversation
          </Text>
          <Check size={14} color="#fff" />
        </Btn>
      )}
    </View>
  );
}
