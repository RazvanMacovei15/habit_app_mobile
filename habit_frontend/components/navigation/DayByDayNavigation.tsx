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
        <Text>{format(selectedDate, "EEEE, MMMM d, yyyy")}</Text>
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
