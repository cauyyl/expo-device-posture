import { Text, View } from "react-native";
import * as DevicePosture from "react-native-device-posture";
import {
  DevicePostureProvider,
  useDevicePosture,
} from "react-native-device-posture";
import { useEffect } from "react";

const PostureContent = () => {
  const posture = useDevicePosture();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Device Posture: {posture}</Text>
    </View>
  );
};

export default function App() {
  return (
    <DevicePostureProvider>
      <PostureContent />
    </DevicePostureProvider>
  );
}
