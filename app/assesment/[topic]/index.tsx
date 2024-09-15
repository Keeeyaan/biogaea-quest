import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Antdesign from "@expo/vector-icons/AntDesign";

import { ASSESSMENTS } from "@/constant/assesments";
import CustomButton from "@/components/CustomButton";
import ProgressBar from "@/components/ProgressBar";
import AssessmentResult from "../assessment-result";

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
      <Pressable className="mt-12 items-end mb-4" onPress={() => router.back()}>
        <Antdesign name="close" size={24} color="#fff" />
      </Pressable>

      <Text className="text-center text-white font-psemibold text-base">
        Topic
      </Text>
      <Text className="text-center text-white font-pbold text-2xl mb-4">
        {formattedTopicText}
      </Text>

      <View className="bg-white rounded-lg p-3 min-h-[650px] overflow-hidden">
        <View className="mb-6 items-center mt-2">
          <Text className="text-base font-pregular text-center mb-4">
            Question {currentQuestionIndex + 1} out of {totalQuestions}
          </Text>
          <ProgressBar progress={progress} />
        </View>

        <View className="bg-[#FFE5D9] p-2 h-[180px] rounded justify-center  items-center">
          <Text className="text-xl text-center font-psemibold">
            {currentQuestion.question}
          </Text>
        </View>
        <View className="mt-6">
          <Text className="mb-2 font-pmedium text-sm">Choices:</Text>
          <ScrollView
            className="max-h-[320px]"
            showsVerticalScrollIndicator={false}
          >
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
    </LinearGradient>
  );
};

export default AssessmentScreen;
