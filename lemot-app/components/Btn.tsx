import { Pressable, Text, type ViewStyle } from "react-native";
import { P } from "@/constants/theme";

interface BtnProps {
  onPress: () => void;
  children: React.ReactNode;
  color?: string;
  disabled?: boolean;
  className?: string;
  style?: ViewStyle;
}

export function Btn({
  onPress,
  children,
  color = P.red,
  disabled = false,
  className = "",
  style,
}: BtnProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`w-full rounded-xl items-center justify-center flex-row mt-3 ${className}`}
      style={[
        {
          paddingVertical: 13,
          backgroundColor: color,
          opacity: disabled ? 0.5 : 1,
          gap: 6,
        },
        style,
      ]}
    >
      {typeof children === "string" ? (
        <Text className="text-white text-sm font-semibold">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
