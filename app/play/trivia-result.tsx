import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

const TriviaResult = () => {
  const { totalQuestions, correctAnswers, score } = useLocalSearchParams();
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#AC8575", "#463630"]}
      className="flex-1 justify-center items-center p-4 w-full"
    >
      <View className="w-full rounded-lg justify-center items-center p-6 bg-[#FFF8F5]">
        <Text
          className="font-pbold uppercase text-center mb-4 text-[#7DB91F]"
          style={{ fontSize: RFValue(24, 805) }}
        >
          Congratulations you have completed this trivia!
        </Text>
        <Text
          className="font-pregular mb-4"
          style={{ fontSize: RFValue(18, 805) }}
        >
          Your total score is
        </Text>
        <Text
          className="font-pbold"
          style={{ fontSize: RFValue(72, 805), lineHeight: RFValue(80, 805) }}
        >
          {score || 0}
        </Text>
        <Text
          className="text-center font-pregular"
          style={{ fontSize: RFValue(16, 805) }}
        >
          You answered {correctAnswers} out of {totalQuestions} questions
          correctly.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/")}
          className="mt-4 bg-[#7DB91F] w-full rounded"
          style={{
            paddingTop: RFValue(8, 805),
            paddingBottom: RFValue(8, 805),
          }}
        >
          <Text
            className="text-white text-center font-psemibold"
            style={{ fontSize: RFValue(16, 805) }}
          >
            Go Home
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default TriviaResult;
