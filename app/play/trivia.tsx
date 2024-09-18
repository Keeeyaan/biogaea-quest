import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import Antdesign from "@expo/vector-icons/AntDesign";
import { ASSESSMENTS } from "@/constant/assesments";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { RFValue } from "react-native-responsive-fontsize";

const shuffleQuestions = (questions: any[]) => {
  return questions.sort(() => Math.random() - 0.5).slice(0, 10);
};

const screenHeight = Dimensions.get("window").height;

const TriviaQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds for each question
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Timer reference
  const [showTransitionScreen, setShowTransitionScreen] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const categories = Object.keys(ASSESSMENTS); // Get categories from the data
  const currentCategory = categories[currentCategoryIndex];
  const currentCategoryQuestions =
    ASSESSMENTS[currentCategory as keyof typeof ASSESSMENTS] || [];

  useEffect(() => {
    // Shuffle questions when the component mounts
    const shuffled = shuffleQuestions(currentCategoryQuestions);
    setShuffledQuestions(shuffled);
    setShowTransitionScreen(false);
  }, [currentCategoryIndex]);

  useEffect(() => {
    // Start the timer only when questions are available
    if (shuffledQuestions.length > 0 && !showTransitionScreen) {
      startTimer(); // Start the timer for the first question
    }

    return () => clearInterval(timerRef.current!); // Cleanup timer on unmount
  }, [shuffledQuestions, showTransitionScreen]);

  // Start and reset the timer for each question
  const startTimer = () => {
    clearInterval(timerRef.current!); // Clear previous timer
    setTimeLeft(10); // Reset time to 10 seconds
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
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
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < shuffledQuestions.length - 1) {
        startTimer(); // Reset the timer for the next question
        return prevIndex + 1; // Move to the next question
      } else {
        if (currentCategoryIndex < categories.length - 1) {
          setShowTransitionScreen(true); // Show transition screen
          setTimeout(() => {
            setCurrentCategoryIndex((prevIndex) => prevIndex + 1); // Move to the next category
          }, 2000); // 2 seconds delay for transition screen
          return 0; // Stay on the last question of the current category
        } else {
          endQuiz(); // End the quiz if no more categories
          return prevIndex; // Ensure it doesn't exceed the length
        }
      }
    });
  };

  // Handle when a user selects an answer
  const handleAnswer = (answer: string) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    if (answer === currentQuestion.answer) {
      setCorrectAnswers((prev) => prev + 1); // Increment correct answers
      if (timeLeft > 6) {
        setScore((prevScore) => prevScore + 10);
      } else if (timeLeft > 3 && timeLeft <= 6) {
        setScore((prevScore) => prevScore + 8);
      } else {
        setScore((prevScore) => prevScore + 6);
      }
    }

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => {
        startTimer(); // Reset the timer for the next question
        return prevIndex + 1;
      });
    } else {
      handleTimeUp(); // Handle time up if it's the last question
    }
  };

  // End the quiz and navigate to the results screen
  const endQuiz = () => {
    clearInterval(timerRef.current!);
    setQuizFinished(true); // Set the state indicating the quiz is finished
  };

  useEffect(() => {
    if (quizFinished) {
      // Navigate to trivia result after the quiz finishes
      router.push({
        pathname: "/play/trivia-result",
        params: {
          totalQuestions: 50,
          correctAnswers: correctAnswers,
          score: score,
        },
      });
    }
  }, [quizFinished]); // Only navigate when the quiz is finished

  // Function to determine the color of the timer
  const getTimerColor = () => {
    if (timeLeft > 6) return "#6EA714"; // Green
    if (timeLeft > 3) return "#FFA500"; // Yellow
    return "#FF0000"; // Red
  };

  // Add an extra check to ensure currentQuestion is defined
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  if (showTransitionScreen) {
    return (
      <View
        className="flex-1 p-4 bg-[#FFF8F5]"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Text
          className="text-xl font-psemibold"
          style={{ fontSize: RFValue(16, 805) }}
        >
          Next Category
        </Text>
        <Text
          className="font-pbold text-center text-[#6EA714]"
          style={{ fontSize: RFValue(24, 805) }}
        >
          {categories[currentCategoryIndex + 1] &&
            categories[currentCategoryIndex + 1]
              .replaceAll("-", " ")
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
        </Text>
      </View>
    );
  }

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
            router.push("/");
          }}
          className="font-bold"
        />
        <Text
          style={{ fontSize: RFValue(18, 805) }}
          className="bg-[#AB8475] font-semibold px-4 py-0.5 text-white rounded-lg"
        >
          {score}
        </Text>
        <Text className="font-pmedium" style={{ fontSize: RFValue(16, 805) }}>
          {currentQuestionIndex + 1} / {shuffledQuestions.length}
        </Text>
      </View>

      {/* Circular Countdown Timer with dynamic color */}
      <View className="items-center mb-6">
        <AnimatedCircularProgress
          size={120}
          width={12}
          fill={(timeLeft / 10) * 100} // Percentage of time remaining
          tintColor={getTimerColor()} // Dynamic color based on time left
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ minHeight: screenHeight / 1.5 }}>
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
                style={{ padding: RFValue(14, 805) }}
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
      </ScrollView>
    </View>
  );
};

export default TriviaQuiz;
