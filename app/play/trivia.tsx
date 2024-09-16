import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Antdesign from "@expo/vector-icons/AntDesign";
import { TRIVIA_QUESTIONS } from "@/constant/trivia-questions";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { RFValue } from "react-native-responsive-fontsize";

// Flatten and shuffle all questions
const ALL_QUESTIONS = Object.values(TRIVIA_QUESTIONS).flat();

const shuffleQuestions = (questions: any[]) => {
  return questions.sort(() => Math.random() - 0.5);
};

const TriviaQuiz = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds for each question
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Timer reference

  useEffect(() => {
    // Shuffle questions when the component mounts
    const shuffled = shuffleQuestions(ALL_QUESTIONS);
    setShuffledQuestions(shuffled);
  }, []);

  useEffect(() => {
    // Start the timer only when questions are available
    if (shuffledQuestions.length > 0) {
      startTimer(); // Start the timer for the first question
    }

    return () => clearInterval(timerRef.current!); // Cleanup timer on unmount
  }, [shuffledQuestions]);

  // Start and reset the timer for each question
  const startTimer = () => {
    console.log("timer start");
    clearInterval(timerRef.current!); // Clear previous timer
    setTimeLeft(10); // Reset time to 10 seconds
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        console.log(prevTime);
        if (prevTime === 0) {
          clearInterval(timerRef.current!);
          handleTimeUp(); // Move to the next question when time is up
          return 10;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Handle when the timer runs out
  const handleTimeUp = () => {
    // Ensure we are using the latest index and questions length
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < shuffledQuestions.length - 1) {
        startTimer(); // Reset the timer for the next question
        console.log(prevIndex);
        return prevIndex + 1; // Move to the next question
      } else {
        endQuiz(); // End the quiz if no more questions
        return prevIndex; // Ensure it doesn't exceed the length
      }
    });
  };

  // Handle when a user selects an answer
  const handleAnswer = (answer: string) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    if (answer === currentQuestion.answer) {
      setCorrectAnswers((prev) => prev + 1); // Increment correct answers
    }

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => {
        startTimer(); // Reset the timer for the next question
        return prevIndex + 1;
      });
    } else {
      endQuiz(); // End the quiz if it's the last question
    }
  };

  // End the quiz and navigate to the results screen
  const endQuiz = () => {
    clearInterval(timerRef.current!);
    router.push({
      pathname: "/play/trivia-result",
      params: {
        totalQuestions: shuffledQuestions.length,
        correctAnswers: correctAnswers,
      },
    });
  };

  // Add an extra check to ensure currentQuestion is defined
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return <Text>Loading questions...</Text>;
  }

  return (
    <View className="flex-1 p-4 bg-[#FFF8F5]">
      {/* Header with back button and question counter */}
      <View className="flex-row items-center justify-between my-10">
        <Antdesign
          name="left"
          size={24}
          color="#000"
          onPress={() => {
            clearInterval(timerRef.current!);
            router.back();
          }}
          className="font-bold"
        />
        <Text className="font-pmedium" style={{ fontSize: RFValue(16, 805) }}>
          {currentQuestionIndex + 1} / {shuffledQuestions.length}
        </Text>
      </View>

      {/* Circular Countdown Timer */}
      <View className="items-center mb-6">
        <AnimatedCircularProgress
          size={120}
          width={12}
          fill={(timeLeft / 10) * 100} // Percentage of time remaining
          tintColor="#6EA714"
          backgroundColor="#e0e0e0"
          rotation={0}
        >
          {() => (
            <Text
              className="text-xl font-pbold"
              style={{ fontSize: RFValue(18, 805) }}
            >
              {timeLeft}s
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* Question Text */}
      <View className="bg-[#FFE5D9] p-2 min-h-[150px] rounded justify-center items-center mb-6">
        <Text
          className="font-psemibold text-center"
          style={{ fontSize: RFValue(18, 805) }}
        >
          {currentQuestion.question}
        </Text>
      </View>

      {/* Answer Choices */}
      <View>
        {currentQuestion.choices.map((choice: string, index: number) => (
          <TouchableOpacity
            key={index}
            className="bg-[#6EA714] mb-2 rounded"
            style={{ padding: RFValue(16, 805) }}
            activeOpacity={0.7}
            onPress={() => handleAnswer(choice)}
          >
            <Text
              className="text-white font-psemibold text-center"
              style={{ fontSize: RFValue(14, 805) }}
            >
              {choice}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TriviaQuiz;
