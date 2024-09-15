import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import PdfReader from "@/components/PdfReader";
import TopSheet from "@/components/TopSheet";
import { StatusBar } from "expo-status-bar";

const LearnScreen = () => {
  const { topic } = useLocalSearchParams();

  return (
    <View className="flex-1">
      <TopSheet topic={topic} />
      <PdfReader topic={topic} />
      <StatusBar style="light" />
    </View>
  );
};

export default LearnScreen;
