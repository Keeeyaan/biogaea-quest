import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";

interface AssessmentResultProps {
  topic: string | boolean;
  totalQuestions: number;
  correctAnswers: number;
}

const { width, height } = Dimensions.get("window");

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
      className="flex-1 justify-center items-center p-4"
    >
      <Text
        className="text-center text-white font-psemibold text-base"
        style={{ fontSize: RFValue(14, 805) }}
      >
        Topic
      </Text>
      <Text
        className="text-center text-white font-pbold text-2xl mb-4"
        style={{ fontSize: RFValue(20, 805), marginBottom: RFValue(8, 805) }}
      >
        {topic}
      </Text>
      <View
        className="bg-white justify-center items-center w-full rounded-lg px-2"
        style={{
          paddingTop: RFValue(20, 805),
          paddingBottom: RFValue(20, 805),
        }}
      >
        <Image
          source={require("@/assets/images/trophy.png")}
          style={{
            width: width * 0.6, // Image width is 70% of the screen width
            height: height * 0.25, // Image height is 25% of the screen height
            resizeMode: "contain", // Ensures the image scales properly
          }}
        />
        <Text
          className="text-4xl font-pbold"
          style={{ fontSize: RFValue(34, 805) }}
        >
          Congratulations!
        </Text>
        <Text
          className="text-base font-pregular"
          style={{ fontSize: RFValue(16, 805) }}
        >
          Assessment completed successfully.
        </Text>

        <Text
          className={`font-pbold ${
            parseInt(scorePercentage.toFixed(0)) >= 50
              ? "text-[#6EA714]"
              : "text-red-500"
          }`}
          style={{ fontSize: RFValue(74, 805) }}
        >
          {scorePercentage.toFixed(0)}%
        </Text>

        <Text
          className="font-pregular mb-5 text-center"
          style={{ fontSize: RFValue(16, 805), marginBottom: RFValue(10, 805) }}
        >
          You attempted {totalQuestions} questions, {"\n"}
          and <Text className="font-psemibold">{correctAnswers}</Text> of your
          answers were{" "}
          <Text className="font-psemibold text-[#6EA714]">correct.</Text>
        </Text>

        <TouchableOpacity
          className={`w-4/5 bg-[#6EA714]  rounded`}
          activeOpacity={0.7}
          onPress={() => router.push("/")}
          style={{ padding: RFValue(10, 805) }}
        >
          <Text
            className={`text-white text-center text-base font-psemibold`}
            style={{ fontSize: RFValue(16, 805) }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AssessmentResult;
