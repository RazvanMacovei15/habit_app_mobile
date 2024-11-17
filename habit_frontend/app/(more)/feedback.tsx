import { View, Text } from "react-native";
import React from "react";

const Feedback = () => {
  return (
    <View className="flex flex-col grow p-5">
      <View className="grow items-center justify-center">
        <Text className="text-center">
          You will be able to leave a feedback for me in the future.
        </Text>
        <Text className="p-10 text-3xl text-green-700">
          Stay tuned for more!
        </Text>
      </View>
    </View>
  );
};

export default Feedback;
