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
  selectedDate: string;
  incrementDate: () => void;
  decrementDate: () => void;
}

const DayByDayNavigation = ({
  incrementDate,
  decrementDate,
  selectedDate,
}: DayByDayNavigationProps) => {
  const today = new Date();

  //method to check what day it is if its today say today if its tomorrow say tomorrow and if its yesterday say yesterday and if its none of those say the day
  const checkDay = (date: string) => {
    const dateObj = new Date(date);
    if (dateObj.toDateString() === today.toDateString()) {
      return "Today";
    } else if (
      dateObj.toDateString() ===
      new Date(today.setDate(today.getDate() + 1)).toDateString()
    ) {
      return "Tomorrow";
    } else if (
      dateObj.toDateString() ===
      new Date(today.setDate(today.getDate() - 2)).toDateString()
    ) {
      return "Yesterday";
    } else {
      return format(dateObj, "EEEE, MMMM d");
    }
  };

  return (
    <View className="flex flex-row justify-around h-16 items-center">
      <View className="border-r-2 w-1/6 items-center border-gray-400 flex flex-row justify-center">
        <TouchableOpacity onPress={decrementDate} className="grow items-center">
          <Image
            source={icons.arrow as ImageSourcePropType}
            className="w-4 h-6"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="w-4/6 items-center">
        <Text className="text-lg">{checkDay(selectedDate)}</Text>
      </TouchableOpacity>
      <View className="border-l-2 w-1/6 border-gray-400 items-center flex flex-row justify-center">
        <TouchableOpacity onPress={incrementDate} className="grow items-center">
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
