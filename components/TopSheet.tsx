import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Animated as AnimatedComp,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import Antdesign from "@expo/vector-icons/AntDesign";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import VideoModal from "./VideoModal";

const VIDEO_MAP: { [key: string]: any } = {
  "genetic-engineering": require("@/assets/videos/genetic-engineering.mp4"),
  "organ-systems-of-representative-animals": require("@/assets/videos/organ-systems-of-representative-animals.mp4"),
  "interaction-and-interdependence": require("@/assets/videos/interaction-and-interdependence.mp4"),
  "process-of-evolution": require("@/assets/videos/process-of-evolution.mp4"),
};

interface TopSheetProps {
  topic: string | string[];
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MIN_HEIGHT = 130; // Minimum height of the TopSheet
const MAX_HEIGHT = SCREEN_HEIGHT * 0.5; // Set MAX_HEIGHT to half the screen height for better visibility
const BUTTON_SHOW_HEIGHT = MIN_HEIGHT + 30; // Lowered the threshold to make buttons appear sooner

const AnimatedLinearGradient = Animated.createAnimatedComponent(
  AnimatedComp.createAnimatedComponent(LinearGradient)
);

const TopSheet = ({ topic }: TopSheetProps) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const formattedTopicText =
    typeof topic == "string" &&
    topic
      .replaceAll("-", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const videoSource = VIDEO_MAP[topic as string];

  const height = useSharedValue(MIN_HEIGHT);
  const startHeight = useSharedValue(MIN_HEIGHT);

  // Derived value to track if buttons should be visible
  const showButtons = useDerivedValue(() => {
    return height.value >= BUTTON_SHOW_HEIGHT ? 1 : 0;
  });

  // Update the height dynamically as the user swipes, without snapping
  const gesture = Gesture.Pan()
    .onStart(() => {
      startHeight.value = height.value;
    })
    .onUpdate((event) => {
      const newHeight = startHeight.value + event.translationY;
      height.value = Math.max(MIN_HEIGHT, Math.min(newHeight, MAX_HEIGHT));
    });

  const rTopSheetStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  // Use Animated Style to control button visibility and add margin/padding when showing
  const rButtonContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(showButtons.value, { duration: 200 }), // Smooth transition for visibility
      marginTop: withTiming(showButtons.value ? 20 : 0), // Add space when the buttons are visible
      pointerEvents: showButtons.value ? "auto" : "none",
    };
  });

  return (
    <>
      <GestureDetector gesture={gesture}>
        <AnimatedLinearGradient
          style={[rTopSheetStyle, styles.topSheetContainer]}
          colors={["#AC8575", "#463630"]}
          className="w-full z-10 absolute top-0 justify-between rounded-b-2xl px-[24px]"
        >
          {/* Title Section - Always at the top */}
          <View className="flex-row items-center gap-4 mt-12 z-20">
            <Antdesign
              name="left"
              size={30}
              color="#fff"
              onPress={() => router.push("/")}
            />
            <Text className="text-white text-xl font-pmedium">
              {formattedTopicText}
            </Text>
          </View>
          <View className="flex-1 justify-end">
            {/* Animated View for buttons, shown only when there's enough height */}
            <Animated.View style={[rButtonContainerStyle]}>
              <View className="flex-row justify-between">
                <TouchableOpacity
                  className={`bg-[#6EA714] px-4 py-3 mr-2 rounded`}
                  activeOpacity={0.7}
                  onPress={() => setIsVideoVisible(true)}
                >
                  <Text
                    className={`text-white text-center text-base font-psemibold`}
                  >
                    Play Video
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`bg-[#6EA714] px-4 py-3 flex-1 rounded`}
                  activeOpacity={0.7}
                  onPress={() =>
                    router.push({ pathname: `/assesment/${topic}` as any })
                  }
                >
                  <Text
                    className={`text-white text-center text-base font-psemibold`}
                  >
                    Take Assessment
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Bottom drag indicator */}
            <View className="items-center mb-3 mt-3">
              <View className="w-[70px] py-0.5 rounded-md bg-white" />
            </View>
          </View>
        </AnimatedLinearGradient>
      </GestureDetector>
      {/* Video Modal */}
      {videoSource && (
        <VideoModal
          isVisible={isVideoVisible}
          onClose={() => setIsVideoVisible(false)} // Hide modal on close
          videoSource={videoSource}
        />
      )}
    </>
  );
};

export default TopSheet;

const styles = StyleSheet.create({
  topSheetContainer: {
    height: MIN_HEIGHT,
    justifyContent: "flex-start",
  },
});
