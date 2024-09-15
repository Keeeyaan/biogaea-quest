import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

interface AssessmentResultProps {
  topic: string | boolean;
  totalQuestions: number;
  correctAnswers: number;
}

const AssessmentResult = ({
  topic,
  totalQuestions,
  correctAnswers,
}: AssessmentResultProps) => {
  const router = useRouter();
  const scorePercentage = (correctAnswers / totalQuestions) * 100;

  return (
    <LinearGradient
      colors={["#AC8575", "#463630"]}
      className="flex-1 justify-center items-center p-3"
    >
      <Text className="text-center text-white font-psemibold text-base">
        Topic
      </Text>
      <Text className="text-center text-white font-pbold text-2xl mb-4">
        {topic}
      </Text>
      <View className="bg-white justify-center items-center w-full rounded-lg p-3 min-h-[650px]">
        <Image
          className="h-[200px] w-[250px] mb-2"
          source={require("@/assets/images/trophy.png")}
        />
        <Text className="text-4xl font-pbold">Congratulations!</Text>
        <Text className=" text-base font-pregular">
          Assessment completed successfully.
        </Text>

        <Text
          className={`text-[100px] font-pbold ${
            parseInt(scorePercentage.toFixed(0)) >= 50
              ? "text-[#6EA714]"
              : "text-red-500"
          }`}
        >
          {scorePercentage.toFixed(0)}%
        </Text>

        <Text className=" font-pregular text-lg mb-5 text-center">
          You attempted {totalQuestions} questions, {"\n"}
          and <Text className="font-psemibold">{correctAnswers}</Text> of your
          answers were{" "}
          <Text className="font-psemibold text-[#6EA714]">correct.</Text>
        </Text>

        <TouchableOpacity
          className={`w-4/5 bg-[#6EA714] px-4 py-3 rounded`}
          activeOpacity={0.7}
          onPress={() => router.push("/")}
        >
          <Text className={`text-white text-center text-base font-psemibold`}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AssessmentResult;
