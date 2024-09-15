import { router } from "expo-router";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface CardButtonProps {
  title: string;
  route?: string;
}

const CardButton = ({ title, route }: CardButtonProps) => {
  return (
    <View className="w-full">
      <TouchableOpacity
        onPress={() => router.push({ pathname: route as any })}
        className="mt-2 mx-1  bg-[#7DB91F] rounded-lg items-center justify-center"
        style={{ padding: RFValue(16, 805) }}
      >
        <Text
          className="text-center font-psemibold text-white"
          style={{ fontSize: RFValue(14, 805) }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardButton;
