import { router } from "expo-router";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CardButtonProps {
  title: string;
  route?: string;
}

const CardButton = ({ title, route }: CardButtonProps) => {
  return (
    <View className="w-full">
      <TouchableOpacity
        onPress={() => router.push({ pathname: route as any })}
        className="mt-2 mx-1 p-5 bg-[#7DB91F] rounded-lg items-center justify-center"
      >
        <Text className="text-center font-psemibold text-white">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardButton;
