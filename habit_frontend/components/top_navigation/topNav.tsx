import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../../constants";

const TopNav = () => {
  return (
    <View className="flex-row justify-around mt-12 p-1 bg-blue-100">
      <TouchableOpacity className="justify-center items-center">
        <Image
          source={icons.user_circle as ImageSourcePropType}
          className="h-14 w-14"
        />
      </TouchableOpacity>
      <TouchableOpacity className="flex-col w-2/4 items-center justify-center">
        <Text className="text-4xl rounded-lg p-2 font-medium">FOCUS</Text>
        <Text className="text-center text-xs text-red-600 w-full">
          That which you don't track{"\n"} You can't improve
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="items-center justify-center">
        <Image
          source={icons.notification as ImageSourcePropType}
          className="h-8 w-8"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopNav;
