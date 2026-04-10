import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { P } from "@/constants/theme";
import { useAuthContext } from "@/providers/AuthProvider";

export default function AuthScreen() {
  const { signIn, signUp } = useAuthContext();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await signIn(email.trim(), password);
      } else {
        await signUp(email.trim(), password, name.trim());
      }
      router.replace("/(tabs)");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6"
      >
        {/* Header */}
        <View className="items-center mb-10">
          <Text className="text-4xl font-bold text-lm-ink tracking-tight">
            LE MOT
          </Text>
          <Text className="text-sm text-lm-ink2 mt-2">
            Learn French through meaning
          </Text>
        </View>

        {/* Form */}
        <View className="bg-lm-paper rounded-2xl p-6 border border-lm-border">
          <Text className="text-lg font-bold text-lm-ink mb-4">
            {mode === "login" ? "Welcome back" : "Create account"}
          </Text>

          {mode === "signup" && (
            <TextInput
              className="border border-lm-border rounded-xl px-4 py-3 text-base text-lm-ink mb-3"
              placeholder="Your name"
              placeholderTextColor={P.ink3}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          )}

          <TextInput
            className="border border-lm-border rounded-xl px-4 py-3 text-base text-lm-ink mb-3"
            placeholder="Email"
            placeholderTextColor={P.ink3}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            className="border border-lm-border rounded-xl px-4 py-3 text-base text-lm-ink mb-4"
            placeholder="Password"
            placeholderTextColor={P.ink3}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error !== "" && (
            <Text className="text-sm mb-3" style={{ color: P.red }}>
              {error}
            </Text>
          )}

          <Pressable
            onPress={handleSubmit}
            disabled={loading}
            className="rounded-xl py-3.5 items-center"
            style={{ backgroundColor: P.red, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white text-base font-semibold">
                {mode === "login" ? "Sign In" : "Sign Up"}
              </Text>
            )}
          </Pressable>
        </View>

        {/* Toggle */}
        <Pressable
          onPress={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
          }}
          className="mt-4 items-center"
        >
          <Text className="text-sm text-lm-ink2">
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <Text className="font-bold" style={{ color: P.red }}>
              {mode === "login" ? "Sign Up" : "Sign In"}
            </Text>
          </Text>
        </Pressable>

        {/* Skip */}
        <Pressable
          onPress={() => router.replace("/(tabs)")}
          className="mt-6 items-center"
        >
          <Text className="text-xs text-lm-ink3">
            Continue without account →
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
