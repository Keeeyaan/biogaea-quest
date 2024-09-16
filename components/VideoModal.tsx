import React, { useRef } from "react";
import { Modal, View, Dimensions, Pressable } from "react-native";
import { AVPlaybackNativeSource, ResizeMode, Video } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface VideoModalProps {
  isVisible: boolean;
  onClose: () => void;
  videoSource: AVPlaybackNativeSource;
}
const VideoModal = ({ isVisible, onClose, videoSource }: VideoModalProps) => {
  const videoRef = useRef(null);

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Pressable
          onPress={onClose}
          style={{
            position: "absolute",
            top: RFValue(30, 805),
            right: 20,
            zIndex: 1,
          }}
        >
          <AntDesign name="close" size={30} color="#fff" />
        </Pressable>
        <Video
          ref={videoRef}
          source={videoSource}
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
          shouldPlay
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      </View>
    </Modal>
  );
};

export default VideoModal;
