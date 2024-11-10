import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React, { useState } from "react";
import { format } from "date-fns";
import icons from "@/constants/icons";

interface DayByDayNavigationProps {
  onPress: (date: Date) => void;
}

const DayByDayNavigation = ({ onPress }: DayByDayNavigationProps) => {
  const [currentDay, setCurrentDay] = useState(new Date());

  // Function to move one day back
  const handleLeftPress = () => {
    setCurrentDay(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1))
    );
  };

  // Function to move one day forward
  const handleRightPress = () => {
    setCurrentDay(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
    );
  };
  return (
    <View className="flex flex-row justify-around h-16 items-center">
      <View className="border-r-2 w-1/6 items-center border-gray-400">
        <TouchableOpacity onPress={handleLeftPress}>
          <Image
            source={icons.arrow as ImageSourcePropType}
            className="w-4 h-6"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="w-4/6 items-center"
        onPress={() => onPress(currentDay)}
      >
        <Text>{format(currentDay, "EEEE, MMMM d, yyyy")}</Text>
      </TouchableOpacity>
      <View className="border-l-2 w-1/6 border-gray-400 items-center">
        <TouchableOpacity onPress={handleRightPress}>
          <Image
            source={icons.arrow as ImageSourcePropType}
            className="w-4 h-6"
            style={{ transform: [{ rotateY: "180deg" }] }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DayByDayNavigation;
