import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";

const TriviaResult = () => {
  const { totalQuestions, correctAnswers } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-4 bg-[#FFF8F5]">
      <Text className="font-pbold mb-2" style={{ fontSize: RFValue(24, 805) }}>
        Trivia Completed!
      </Text>
      <Text
        className="text-center font-pregular"
        style={{ fontSize: RFValue(18, 805) }}
      >
        You answered {correctAnswers} out of {totalQuestions} questions
        correctly.
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/")}
        className="px-6 mt-4 bg-[#7DB91F] rounded"
        style={{ padding: RFValue(10, 805) }}
      >
        <Text
          className="text-white font-psemibold"
          style={{ fontSize: RFValue(16, 805) }}
        >
          Go Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TriviaResult;
