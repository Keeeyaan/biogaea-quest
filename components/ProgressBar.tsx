import { View } from "react-native";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <View className="h-2 w-3/4 bg-[#e0e0e0] rounded overflow-hidden">
      <View
        style={{ width: `${progress * 100}%` }}
        className="h-full bg-[#6EA714] "
      />
    </View>
  );
};

export default ProgressBar;
