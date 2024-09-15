import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularTimerProps {
  duration: number; // Total time in seconds
  onComplete: () => void; // Callback when time runs out
}

const CircularTimer = ({ duration, onComplete }: CircularTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  // Shared value to animate the strokeDashoffset
  const progress = useSharedValue(circumference);

  useEffect(() => {
    // Start the countdown
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Animate the progress
    progress.value = withTiming(0, {
      duration: duration * 1000,
      easing: Easing.linear,
    });

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Animated props for the Circle component
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: progress.value,
    };
  });

  return (
    <View className="items-center justify-center">
      <Svg width={150} height={150}>
        {/* Background Circle */}
        <Circle
          cx="75"
          cy="75"
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
        />

        {/* Foreground Circle (Animated) */}
        <AnimatedCircle
          cx="75"
          cy="75"
          r={radius}
          stroke="#6EA714"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90" // Start from top (12 o'clock position)
          origin="75, 75"
        />
      </Svg>

      {/* Time Left */}
      <Text className="text-xl font-pbold absolute text-center">
        {timeLeft}s
      </Text>
    </View>
  );
};

export default CircularTimer;
