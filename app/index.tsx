import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import GroupButton from "@/components/GroupButton";
import { LinearGradient } from "expo-linear-gradient";

import CardButton from "@/components/CardButton";

const TOPICS = [
  { id: 1, title: "Genetic Engineering", route: "/learn/genetic-engineering" },
  {
    id: 2,
    title: "Organ Systems of Representative Animals",
    route: "/learn/organ-systems-of-representative-animals",
  },
  {
    id: 3,
    title: "Process of Evolution",
    route: "/learn/process-of-evolution",
  },
  {
    id: 4,
    title: "Interaction and Interdependence",
    route: "/learn/interaction-and-interdependence",
  },
];

const GAMES = [{ id: 1, title: "Trivia", route: "/play/trivia" }];

const screenHeight = Dimensions.get("window").height;

export default function App() {
  const [selected, setSelected] = useState("learn");

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  return (
    <SafeAreaView className="flex-1 h-full bg-[#FFF8F5]">
      <View className="flex-1 mt-5 px-6">
        <View className="">
          <Text className="text-[#4E4E4E] font-pregular text-xl">
            Hello There!
          </Text>
          <Text className="font-pregular text-[#7DB91F] text-[38px]">
            What do you want {"\n"}
            <Text className="font-pbold">to do</Text> today?
          </Text>
        </View>
        <View className="items-center mt-[25px] z-10">
          <GroupButton handleSelect={handleSelect} selected={selected} />
        </View>
      </View>

      <View
        style={{ height: screenHeight / 1.7 }}
        className="flex-1 absolute bottom-0 right-0 left-0 w-full"
      >
        <Image
          className="w-full -z-10"
          source={require("@/assets/images/grass.png")}
        />
        <View className=" bg-[#76584C] h-[3px] w-full" />

        <LinearGradient
          colors={["#AB8475", "#383030"]}
          className="h-full w-full"
        >
          <View className="px-6 mt-4">
            <Text className="text-white font-pbold mb-2">
              Choose a{" "}
              {selected === "learn" ? "topic to learn" : "game to play"}:
            </Text>
            <View className="flex-row justify-center flex-wrap">
              {selected === "learn" &&
                TOPICS.map((topic) => (
                  <CardButton
                    key={topic.id}
                    title={topic.title}
                    route={topic.route}
                  />
                ))}
              {selected === "play" &&
                GAMES.map((game) => (
                  <CardButton
                    key={game.id}
                    title={game.title}
                    route={game.route}
                  />
                ))}
            </View>
          </View>
        </LinearGradient>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
