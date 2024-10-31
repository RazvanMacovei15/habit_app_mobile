import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import BouncyCheckBox from "react-native-bouncy-checkbox";

interface HabitCardProps {
  username: string;
  userId: number;
  habitId: number;
  habit: string;
  habitCompleted: boolean;
  currentStreak: number;
}

const HabitCard = ({
  username,
  userId,
  habitId,
  habit,
  currentStreak,
  habitCompleted,
}: HabitCardProps) => {
  const [selected, setSelected] = useState(false);
  const [isCompletedFromDB, setIsCompletedFromDB] = useState(habitCompleted);

  const toggleExpand = () => {
    setSelected(!selected);
  };

  return (
    <View className="gap-2">
      <TouchableOpacity
        onPress={toggleExpand}
        activeOpacity={0.8}
        className="bg-yellow-300 rounded-xl p-2 flex-row justify-between items-center h-14"
      >
        <Text className="text-start text-2xl text-black w-5/6">{habit}</Text>
        <View>
          <BouncyCheckBox
            size={35}
            isChecked={isCompletedFromDB}
            fillColor="red"
            unFillColor="#FFFFFF"
            disableText={true}
            iconStyle={{
              borderColor: "purple",
            }}
            innerIconStyle={{
              borderWidth: 2,
            }}
            textStyle={{
              fontFamily: "JosefinSans-Regular",
            }}
            onPress={(isChecked: boolean) => {
              console.log(isChecked);
            }}
          ></BouncyCheckBox>
        </View>
      </TouchableOpacity>
      {selected && (
        <View className="bg-gray-200 -mt-4 pt-4 -z-40 rounded-b-xl justify-start p-5">
          <Text className="text-gray-800 text-xl">
            Habit {habitId} is {habitCompleted ? "completed" : "not completed"}
            {"\n"}
            {"\n"}
            {username} your current streak is: {currentStreak}
          </Text>
        </View>
      )}
    </View>
  );
};

export default HabitCard;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setError(arg0: null) {
  throw new Error("Function not implemented.");
}

function setData(data: any) {
  throw new Error("Function not implemented.");
}
