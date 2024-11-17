import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { getISOWeek, getYear, startOfWeek, addDays, format } from "date-fns";

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
  const year = Math.floor(selectedYearWeek / 100);
  const week = selectedYearWeek % 100;
  // Get the current week of the year and compare
  const currentWeek = getISOWeek(new Date());

  // Function to set the name of this week, last week, next week depending on the current week
  const checkWeek = (week: number) => {
    if (week === currentWeek) {
      return <Text className="text-lg">This week</Text>;
    } else if (week === currentWeek - 1) {
      return <Text className="text-lg">Last Week</Text>;
    } else if (week === currentWeek + 1) {
      return <Text className="text-lg">Next Week</Text>;
    } else {
      // Calculate the start of the selected week (Monday)
      const monday = startOfWeek(new Date(year, 0, 1), { weekStartsOn: 1 });
      const selectedMonday = addDays(monday, (week - 1) * 7);
      const sunday = addDays(selectedMonday, 6); // Sunday of the selected week

      return (
        <View className="items-center flex flex-row p-1 justify-around w-full">
          <Text className="text-center">{`${format(
            selectedMonday,
            "eeee, dd/MM/yyyy"
          )} \n${format(sunday, "eeee, dd/MM/yyyy")}`}</Text>
          <Text className="text-center">{`Week\n${week}/52`}</Text>
        </View>
      );
    }
  };

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
      <TouchableOpacity className="w-4/6 items-center flex-1" onPress={onPress}>
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
