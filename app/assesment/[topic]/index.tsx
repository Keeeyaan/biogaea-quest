import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Antdesign from "@expo/vector-icons/AntDesign";
import { RFValue } from "react-native-responsive-fontsize";

import { ASSESSMENTS } from "@/constant/assesments";
import CustomButton from "@/components/CustomButton";
import ProgressBar from "@/components/ProgressBar";
import AssessmentResult from "../assessment-result";

const screenHeight = Dimensions.get("window").height;

interface QuestionWithFactors {
  id: number;
  question: string;
  choices: string[];
  answer: string;
  factors?: string;
}

function hasFactors(question: any): question is QuestionWithFactors {
  return "factors" in question;
}

const AssessmentScreen = () => {
  const { topic } = useLocalSearchParams();
  const router = useRouter();

  const formattedTopicText =
    typeof topic == "string" &&
    topic
      .replaceAll("-", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const questions = ASSESSMENTS[topic as keyof typeof ASSESSMENTS];

  if (!questions) {
    return <Text>Error: No questions available for this topic.</Text>;
  }

  const totalQuestions = questions.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.answer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsAssessmentComplete(true); // Set flag to true when assessment is done
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / totalQuestions;

  if (isAssessmentComplete) {
    // Render the result screen if assessment is completed
    return (
      <AssessmentResult
        topic={formattedTopicText}
        totalQuestions={totalQuestions}
        correctAnswers={correctAnswers}
      />
    );
  }
  return (
    <LinearGradient colors={["#AC8575", "#463630"]} className="flex-1 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={{ marginTop: RFValue(28, 805) }}
          className="mt-8 items-end mb-4"
          onPress={() => router.back()}
        >
          <Antdesign name="close" size={24} color="#fff" />
        </Pressable>

        <Text
          className="text-center text-white font-psemibold text-base"
          style={{ fontSize: RFValue(14, 805) }}
        >
          Topic
        </Text>
        <Text
          className="text-center text-white font-pbold text-2xl mb-4"
          style={{ fontSize: RFValue(20, 805), marginBottom: RFValue(4, 805) }}
        >
          {formattedTopicText}
        </Text>

        <View
          className="bg-white rounded-lg p-3 overflow-hidden"
          style={{ minHeight: screenHeight / 1.3 }}
        >
          <View className="mb-6 items-center mt-2">
            <Text
              className="text-base font-pregular text-center mb-4"
              style={{ fontSize: RFValue(16, 805) }}
            >
              Question {currentQuestionIndex + 1} out of {totalQuestions}
            </Text>
            <ProgressBar progress={progress} />
          </View>

          <View className="bg-[#FFE5D9] px-2 py-6 rounded justify-center  items-center">
            <Text
              className="text-xl text-center font-psemibold"
              style={{ fontSize: RFValue(18, 805) }}
            >
              {currentQuestion.question}
            </Text>
          </View>

          {hasFactors(currentQuestion) && currentQuestion?.factors && (
            <View className="mt-2">
              <Text
                className="font-pmedium text-center"
                style={{ fontSize: RFValue(15, 805) }}
              >
                {currentQuestion.factors}
              </Text>
            </View>
          )}

          <View className="mt-4" style={{ marginTop: RFValue(10, 805) }}>
            <Text className="mb-2 font-psemibold text-sm">Choices:</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {currentQuestion.choices.map((choice, index) => (
                <CustomButton
                  key={index}
                  handlePress={() => handleAnswer(choice)}
                  title={choice}
                  textStyles="text-center"
                  marginBottom={8}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default AssessmentScreen;
