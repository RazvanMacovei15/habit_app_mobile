import { Text, View, StyleSheet } from "react-native";
import "../global.css";

import { Link } from "expo-router";

export default function App() {
  return (
    <View className=" bg-gray-500 flex-1 justify-center items-center ">
      <Link
        href={"/dashboard"}
        className="text-2xl text-center bg-amber-500 p-5 mt-20 w-full"
      >
        Go to dashboard
      </Link>
    </View>
  );
}
