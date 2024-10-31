import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import { useAuth } from "@/app/context/AuthContext";

interface Habit {
  habitId: number;
  habitName: string;
  completed: boolean;
  currentStreak: number;
  isSelected?: boolean;
  toggleExpand: () => void;
}

const HabitCard = ({
  habitId,
  habitName,
  currentStreak,
  completed,
  isSelected,
  toggleExpand,
}: Habit) => {
  const [habitData, setHabitData] = useState({
    habitId,
    habitName,
    completed,
    currentStreak,
  });

  // const toggleExpand = () => {
  //   setSelected(!selected);
  // };

  const { authState } = useAuth();
  const token = authState?.token;

  const toggleCompleted = async (id: number) => {
    try {
      const response = await axios.patch(
        `http://maco-coding.go.ro:8010/habits/${id}/update`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHabitData(response.data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <View
      className={`gap-2 rounded-xl border-2
        ${isSelected ? " border-red-500" : "border-transparent"}`}
    >
      <TouchableOpacity
        onPress={toggleExpand}
        activeOpacity={0.8}
        className={
          "bg-white rounded-xl p-2 flex-row justify-between items-center h-14 "
        }
      >
        <Text className="text-start text-2xl text-black w-5/6">
          {habitData.habitName}
        </Text>
        <View>
          <BouncyCheckBox
            size={35}
            isChecked={completed}
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
            onPress={() => {
              toggleCompleted(habitId);
            }}
          ></BouncyCheckBox>
        </View>
      </TouchableOpacity>
      {isSelected && (
        <View className="bg-gray-200 -mt-4 pt-4 -z-40 rounded-b-xl justify-start p-5">
          <Text className="text-gray-800 text-xl">
            Habit {habitId} is{" "}
            {habitData.completed ? "completed" : "not completed"}
            {"\n"}
            {"\n"}
            your current streak is: {currentStreak}
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
