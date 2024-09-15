import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const TriviaResult = () => {
  const { totalQuestions, correctAnswers } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-4 bg-[#FFF8F5]">
      <Text className="text-2xl font-bold mb-4">Quiz Completed!</Text>
      <Text className="text-lg text-center">
        You answered {correctAnswers} out of {totalQuestions} questions
        correctly.
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/")}
        className="mt-6 bg-[#7DB91F] p-4 rounded"
      >
        <Text className="text-white font-psemibold text-lg">Go Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TriviaResult;
