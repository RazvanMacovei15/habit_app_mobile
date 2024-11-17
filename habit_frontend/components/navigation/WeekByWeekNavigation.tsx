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

  //function to set the name of this week thisekk lat week last week and next week next week depending on the current week
  const checkWeek = (week: number) => {
    const currentWeek = dayjs().week();
      if (week === currentWeek) {
        return (
          <Text className="text-lg">This week</Text>
        );
      } else if (week === currentWeek - 1) {
        return <Text className="text-lg">Last Week</Text>;
      } else if (week === currentWeek + 1) {
        return <Text className="text-lg">Next Week</Text>;
      } else {
        return (
          <View className="items-center flex flex-row p-1 justify-around w-full">
            <Text className="text-center">{`${monday.format(
            "dddd, DD/MM/YYYY"
            )} \n${sunday.format("dddd, DD/MM/YYYY")}`}</Text>
            <Text className="text-center">{`Week\n${week}/52`}</Text>
          </View>
        );
      }
    };

  

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
      <TouchableOpacity className="w-4/6 items-center flex-1"
        onPress={onPress}
      >
        {checkWeek(week)}
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
