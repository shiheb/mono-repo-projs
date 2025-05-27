import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reactotron = Reactotron.setAsyncStorageHandler?.(AsyncStorage)
  .configure({
    name: "Expo App",
    host: "192.168.50.180", // <-- Replace with your machine's local IP
  })
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .connect();

if (__DEV__) {
  console.tron = reactotron;
  reactotron.clear?.();
  console.tron.log?.("Reactotron Configured");
}

export default reactotron;
