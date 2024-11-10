import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import icons from "@/constants/icons";

interface DayByDayNavigationProps {
  selectedDate: Date;
  onPress: (date: Date) => void;
  onLeftPress: (date: Date) => void;
  onRightPress: (date: Date) => void;
}

const DayByDayNavigation = ({
  onPress,
  onLeftPress,
  onRightPress,
  selectedDate,
}: DayByDayNavigationProps) => {
  const [currentDay, setCurrentDay] = useState(selectedDate);

  // Move one day back
  const handleLeftPress = () => {
    setCurrentDay((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      onPress(newDate); // Call onPress with the updated date
      onLeftPress(newDate); // Call onLeftPress with the updated date
      return newDate;
    });
  };

  // Move one day forward
  const handleRightPress = () => {
    setCurrentDay((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      onPress(newDate); // Call onPress with the updated date
      onRightPress(newDate); // Call onRightPress with the updated date
      return newDate;
    });
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
