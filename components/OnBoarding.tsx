import {
  Pressable,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import LottieView, { AnimationObject } from "lottie-react-native";

import Ionicions from "@expo/vector-icons/Ionicons";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import { router } from "expo-router";

interface OnboardingData {
  id: number;
  animation: AnimationObject;
  title: string;
  description: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require("../assets/animations/lottie1.json"),
    title: "🏡 Personalized Recommendations",
    description:
      "Tell us your preferences, and we’ll match you with agents who understand exactly what you’re looking for.",
    textColor: "#005b4f",
    backgroundColor: "#ffa3ce",
  },
  {
    id: 2,
    animation: require("../assets/animations/lottie2.json"),
    title: "💬 Direct Communication",
    description:
      "Chat directly with agents to discuss your requirements, ask questions, and get personalized recommendations.",
    textColor: "#1e2169",
    backgroundColor: "#bae4fd",
  },
  {
    id: 3,
    animation: require("../assets/animations/lottie3.json"),
    title: "💰 Secure Payments",
    description:
      "Book your preferred agent with confidence using our secure payment gateway. No hidden fees, just transparent transactions.",
    textColor: "#F15937",
    backgroundColor: "#faeb8a",
  },
  {
    id: 4,
    animation: require("../assets/animations/lottie1.json"),
    title: "🌟 Quality Service",
    description:
      "Our agents are vetted professionals committed to providing top-notch service. Rest assured, you’re in good hands!",
    textColor: "#F15937",
    backgroundColor: "#faeb8a",
  },
];

const OnBoarding = () => {
  const flatlistRef = useAnimatedRef<FlatList<OnboardingData>>();
  const flatlistIndex = useSharedValue(0);
  const x = useSharedValue(0);
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatlistIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <>
      <Animated.FlatList
        ref={flatlistRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <View
              key={index}
              style={{ width: SCREEN_WIDTH }}
              className={`flex-1 justify-around items-center mb-[120px]`}
            >
              <View>
                <LottieView
                  source={item.animation}
                  autoPlay
                  style={{
                    width: SCREEN_WIDTH * 0.9,
                    height: SCREEN_WIDTH * 0.9,
                  }}
                  loop
                />
              </View>
              <View className="mx-4 gap-y-4">
                <Text className="text-white text-3xl font-pbold">
                  {item.title}
                </Text>
                <Text className="text-white font-pregular text-base">
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
        scrollEventThrottle={16}
        horizontal
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View className="flex-row justify-between items-center absolute bottom-[20px] left-0 right-0 mx-[30px] py-[30px]">
        <View className="flex-row h-[40px] justify-center items-center">
          {data.map((_, index) => {
            const animatedDotStyle = useAnimatedStyle(() => {
              const widthAnimation = interpolate(
                x.value,
                [
                  (index - 1) * SCREEN_WIDTH,
                  index * SCREEN_WIDTH,
                  (index + 1) * SCREEN_WIDTH,
                ],
                [10, 20, 10],
                Extrapolation.CLAMP
              );
              const opacityAnimation = interpolate(
                x.value,
                [
                  (index - 1) * SCREEN_WIDTH,
                  index * SCREEN_WIDTH,
                  (index + 1) * SCREEN_WIDTH,
                ],
                [0.5, 1, 0.5],
                Extrapolation.CLAMP
              );
              return {
                width: widthAnimation,
                opacity: opacityAnimation,
              };
            });

            return (
              <Animated.View
                style={[animatedDotStyle]}
                key={index}
                className="h-[10px] bg-white rounded-full mx-[10px]"
              ></Animated.View>
            );
          })}
        </View>
        <Pressable
          onPress={() => {
            if (flatlistIndex.value < data.length - 1) {
              flatlistRef.current?.scrollToIndex({
                index: flatlistIndex.value + 1,
              });
            } else {
              router.push("sign-in");
            }
          }}
        >
          <View className="bg-white justify-center items-center p-6 overflow-hidden rounded-full ">
            <Ionicions
              style={{ position: "absolute" }}
              name="arrow-forward"
              size={26}
              color="#0b0b0b"
            />
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default OnBoarding;
