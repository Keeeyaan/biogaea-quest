import { View, Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const GroupButton = ({
  handleSelect,
  selected,
}: {
  handleSelect: (option: string) => void;
  selected: string;
}) => {
  return (
    <View
      className="w-[300px] h-[50px] bg-[#AB8475] rounded-lg"
      style={{ height: RFValue(48, 805) }}
    >
      <View className="w-full h-full flex flex-row justify-between">
        <TouchableOpacity
          className={`flex-1 justify-center items-center rounded-tl-lg rounded-bl-lg ${
            selected === "learn" && "bg-[#7DB91F]"
          }`}
          onPress={() => handleSelect("learn")}
        >
          <Text className="text-white font-pbold">Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 justify-center items-center rounded-tr-lg rounded-br-lg ${
            selected === "play" && "bg-[#7DB91F]"
          }`}
          onPress={() => handleSelect("play")}
        >
          <Text className="text-white font-pbold">Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupButton;
