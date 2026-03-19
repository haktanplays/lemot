import { useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Send,
  Volume2,
  RotateCcw,
  MessageCircle,
  Coffee,
  Stethoscope,
  Briefcase,
  ArrowRight,
} from "lucide-react-native";
import { P } from "@/constants/theme";
import { useChat } from "@/hooks/useChat";
import { SCENARIOS } from "@/data/scenarios";
import { useApp } from "@/providers/AppProvider";

/* ── Icon resolver for scenario icon strings ── */
const SCENARIO_ICONS: Record<string, typeof Coffee> = {
  Coffee,
  Stethoscope,
  Briefcase,
};

/* ── Chat mode definitions ── */
const CHAT_MODES = [
  {
    m: "free",
    icon: MessageCircle,
    label: "Free Chat",
    desc: "Talk about anything in French",
    starter: "Salut ! On parle de quoi aujourd\u2019hui ?",
  },
  {
    m: "lesson",
    icon: ArrowRight,
    label: "Lesson Focus",
    desc: "Practice grammar you've learned",
    starter: "Bonjour ! Comment tu t\u2019appelles ?",
  },
  {
    m: "correct",
    icon: RotateCcw,
    label: "Error Correction",
    desc: "Write French, I'll find mistakes",
    starter:
      "\u00c9cris en fran\u00e7ais. Dis-moi quelque chose sur ta journ\u00e9e.",
  },
] as const;

export default function ChatScreen() {
  const {
    chatMsgs,
    chatIn,
    setChatIn,
    chatLoading,
    chatMsgCount,
    sendChat,
    resetChat,
    startChat,
    MSG_LIMIT,
  } = useChat();
  const { say, loaded } = useApp();
  const scrollRef = useRef<ScrollView>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatMsgs.length > 0) {
      const timer = setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [chatMsgs.length, chatLoading]);

  if (!loaded) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg items-center justify-center">
        <ActivityIndicator size="small" color={P.red} />
      </SafeAreaView>
    );
  }

  const hasConversation = chatMsgs.length > 0;
  const atLimit = chatMsgCount >= MSG_LIMIT;

  /* ══════════════════════════════════════════════════
     MODE SELECTION (no messages yet)
     ══════════════════════════════════════════════════ */
  if (!hasConversation) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg">
        <ScrollView
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="items-center mb-5">
            <MessageCircle color={P.red} size={28} strokeWidth={1.2} />
            <Text
              className="font-newsreader text-xl font-bold mt-1.5"
              style={{ fontStyle: "italic", color: P.ink }}
            >
              Parle avec moi
            </Text>
            <Text className="text-xs mt-1" style={{ color: P.ink3 }}>
              I won't correct you — I'll say "I didn't understand."
            </Text>
          </View>

          {/* Mode cards */}
          {CHAT_MODES.map((mode) => {
            const Icon = mode.icon;
            return (
              <Pressable
                key={mode.m}
                onPress={() => startChat(mode.m, mode.starter)}
                className="flex-row items-center rounded-xl mb-2 px-4 py-3.5"
                style={{
                  backgroundColor: P.paper,
                  borderWidth: 1,
                  borderColor: P.border,
                  shadowColor: "#2C2825",
                  shadowOpacity: 0.06,
                  shadowRadius: 4,
                  shadowOffset: { width: 0, height: 1 },
                  elevation: 2,
                  gap: 12,
                }}
              >
                <Icon size={20} color={P.red} strokeWidth={1.3} />
                <View className="flex-1">
                  <Text
                    className="text-sm font-bold"
                    style={{ color: P.ink }}
                  >
                    {mode.label}
                  </Text>
                  <Text className="text-xs" style={{ color: P.ink3 }}>
                    {mode.desc}
                  </Text>
                </View>
                <ArrowRight size={14} color={P.ink3} />
              </Pressable>
            );
          })}

          {/* Scenarios header */}
          <Text
            className="text-xs font-bold mt-3 mb-2"
            style={{
              color: P.ink3,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Scenarios
          </Text>

          {/* Scenario cards */}
          {SCENARIOS.map((sc) => {
            const Icon = SCENARIO_ICONS[sc.icon] ?? Coffee;
            return (
              <Pressable
                key={sc.id}
                onPress={() => startChat("scenario", sc.starter, sc.id)}
                className="flex-row items-center rounded-xl mb-1.5 px-3.5 py-3"
                style={{
                  backgroundColor: P.paper,
                  borderWidth: 1,
                  borderColor: P.border,
                  gap: 10,
                }}
              >
                <Icon size={18} color={P.red} strokeWidth={1.3} />
                <View className="flex-1">
                  <Text
                    className="text-[13px] font-bold"
                    style={{ color: P.ink }}
                  >
                    {sc.label}
                  </Text>
                  <Text className="text-[10px]" style={{ color: P.ink3 }}>
                    {sc.desc}
                  </Text>
                </View>
                <ArrowRight size={12} color={P.ink3} />
              </Pressable>
            );
          })}

          <View className="h-8" />
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* ══════════════════════════════════════════════════
     CONVERSATION VIEW (messages exist)
     ══════════════════════════════════════════════════ */
  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* ── Header bar ── */}
        <View
          className="flex-row items-center justify-between mx-6 mt-2 mb-3 px-3 py-2 rounded-xl"
          style={{
            backgroundColor: P.paper,
            borderWidth: 1,
            borderColor: P.border,
          }}
        >
          <Pressable
            onPress={resetChat}
            className="flex-row items-center rounded-md px-2 py-1.5"
            style={{ backgroundColor: "#F0EEEC", gap: 3 }}
          >
            <RotateCcw size={11} color={P.ink2} strokeWidth={2} />
            <Text
              className="text-[10px] font-semibold"
              style={{ color: P.ink2 }}
            >
              New Chat
            </Text>
          </Pressable>
          <Text className="text-[10px]" style={{ color: P.ink3 }}>
            {chatMsgCount}/{MSG_LIMIT}
          </Text>
        </View>

        {/* ── Messages ── */}
        <ScrollView
          ref={scrollRef}
          className="flex-1 mx-6"
          contentContainerStyle={{ paddingBottom: 56, gap: 10 }}
          showsVerticalScrollIndicator={false}
          style={{
            borderLeftWidth: 2,
            borderLeftColor: P.red + "12",
            paddingLeft: 12,
          }}
        >
          {chatMsgs.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <View
                key={i}
                className={`flex-row ${isUser ? "flex-row-reverse" : ""}`}
                style={{ gap: 8 }}
              >
                {/* AI avatar */}
                {!isUser && (
                  <View
                    className="items-center justify-center mt-0.5"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      backgroundColor: P.rl,
                      borderWidth: 1,
                      borderColor: P.rb,
                    }}
                  >
                    <MessageCircle size={12} color={P.red} />
                  </View>
                )}

                {/* Bubble */}
                <View style={{ maxWidth: "78%" }}>
                  <View
                    className="px-3.5 py-2.5"
                    style={{
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      borderBottomLeftRadius: isUser ? 12 : 3,
                      borderBottomRightRadius: isUser ? 3 : 12,
                      backgroundColor: isUser ? P.red : P.paper,
                      borderWidth: isUser ? 0 : 1,
                      borderColor: isUser ? "transparent" : P.border,
                    }}
                  >
                    <Text
                      className="font-newsreader text-[13px]"
                      style={{
                        fontStyle: "italic",
                        lineHeight: 20,
                        color: isUser ? "#FFFFFF" : P.ink,
                      }}
                    >
                      {msg.content}
                    </Text>
                  </View>

                  {/* Listen button for AI messages */}
                  {!isUser && (
                    <Pressable
                      onPress={() => say(msg.content)}
                      className="flex-row items-center self-start mt-1 px-1.5 py-1 rounded"
                      style={{ backgroundColor: "#F0EEEC", gap: 2 }}
                    >
                      <Volume2 size={10} color={P.ink3} />
                      <Text
                        className="text-[9px]"
                        style={{ color: P.ink3 }}
                      >
                        Listen
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })}

          {/* Loading indicator */}
          {chatLoading && (
            <View className="flex-row" style={{ gap: 8 }}>
              <View
                className="items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  backgroundColor: P.rl,
                  borderWidth: 1,
                  borderColor: P.rb,
                }}
              >
                <MessageCircle size={12} color={P.red} />
              </View>
              <View
                className="px-3.5 py-3"
                style={{
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderBottomLeftRadius: 3,
                  borderBottomRightRadius: 12,
                  backgroundColor: P.paper,
                  borderWidth: 1,
                  borderColor: P.border,
                }}
              >
                <ActivityIndicator size="small" color={P.ink3} />
              </View>
            </View>
          )}

          {/* Limit reached message */}
          {atLimit && (
            <View
              className="items-center py-3 px-4 rounded-xl mt-2"
              style={{ backgroundColor: P.al }}
            >
              <Text
                className="text-xs font-semibold text-center"
                style={{ color: P.amber }}
              >
                Message limit reached ({MSG_LIMIT}/{MSG_LIMIT})
              </Text>
              <Pressable onPress={resetChat} className="mt-2">
                <Text
                  className="text-xs font-bold"
                  style={{ color: P.red }}
                >
                  Start a new conversation
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>

        {/* ── Input bar ── */}
        <View
          className="flex-row items-center mx-6 mb-2 mt-1 rounded-xl"
          style={{
            backgroundColor: P.paper,
            borderWidth: 1.5,
            borderColor: chatIn.trim() ? P.red + "50" : P.border,
            paddingLeft: 14,
            paddingRight: 5,
            paddingVertical: 5,
            gap: 5,
          }}
        >
          <TextInput
            value={chatIn}
            onChangeText={setChatIn}
            placeholder={"\u00c9cris en fran\u00e7ais..."}
            placeholderTextColor={P.ink3}
            editable={!atLimit}
            onSubmitEditing={sendChat}
            returnKeyType="send"
            className="flex-1 font-newsreader text-sm"
            style={{
              fontStyle: "italic",
              color: P.ink,
              paddingVertical: 9,
            }}
          />
          <Pressable
            onPress={sendChat}
            disabled={chatLoading || !chatIn.trim() || atLimit}
            className="items-center justify-center"
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: chatIn.trim() ? P.red : "#F0EEEC",
              opacity:
                chatLoading || !chatIn.trim() || atLimit ? 0.5 : 1,
            }}
          >
            <Send
              size={15}
              color={chatIn.trim() ? "#FFFFFF" : P.ink3}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
