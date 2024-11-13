import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React, { useEffect, useState } from "react";
import icons from "@/constants/icons";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

interface WeekByWeekNavigationProps {
  onPress?: () => void;
  selectedYearWeek: number;
  incrementWeek: () => void;
  decrementWeek: () => void;
}

const WeekByWeekNavigation = ({
  onPress,
  selectedYearWeek,
  incrementWeek,
  decrementWeek,
}: WeekByWeekNavigationProps) => {
  // Extract year and week from selectedYearWeek
  const year = selectedYearWeek / 100;
  const week = selectedYearWeek % 100;

  // Calculate the Monday of the specified year and week
  const monday = dayjs().year(year).week(week).startOf("week").add(1, "day"); // Monday of the selected week

  // Calculate the Sunday of the specified year and week
  const sunday = monday.add(6, "days"); // Sunday of the selected week
  return (
    <View className="flex flex-row justify-around h-16 items-center">
      <View className="border-r-2 w-1/6 items-center border-gray-400 flex flex-row justify-center">
        <TouchableOpacity onPress={decrementWeek} className="grow items-center">
          <Image
            source={icons.arrow as ImageSourcePropType}
            className="w-4 h-6"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="w-4/6 items-center flex flex-row p-1 justify-around"
        onPress={onPress}
      >
        <Text className="">{`${monday.format(
          "dddd, DD/MM/YYYY"
        )} \n${sunday.format("dddd, DD/MM/YYYY")}`}</Text>

        <Text>{`Week\n${week}/${monday.format("YYYY")}`}</Text>
      </TouchableOpacity>
      <View className="border-l-2 w-1/6 border-gray-400 items-center flex flex-row justify-center">
        <TouchableOpacity onPress={incrementWeek} className="grow items-center">
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

export default WeekByWeekNavigation;
