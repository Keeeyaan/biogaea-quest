import { Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind"; // Ensure you're importing this if using NativeWind

interface CustomButtonProps {
  title?: string;
  handlePress?: () => void;
  className?: string;
  textStyles?: string;
  isLoading?: boolean;
  marginBottom?: number;
}

const CustomButton = ({
  title,
  handlePress,
  className,
  textStyles,
  isLoading,
  marginBottom,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={`${className} bg-[#6EA714] px-4 py-3 rounded`}
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading}
      style={{ marginBottom }}
    >
      <Text className={`text-white text-base font-pmedium ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default styled(CustomButton);
