import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import { useAuth } from "@/app/context/AuthContext";
import { HabitDTO } from "../../types/HabitDTO";
import { DailyLogDTO } from "@/components/types/DailyLogDTO";
import { LogData } from "@/app/(tabs)/habits";

interface SingleTargetCardProps {
  logData: LogData;
  isSelected: boolean;
  onSelect: () => void;
}

const SingleTargetCard = ({
  logData,
  isSelected,
  onSelect,
}: SingleTargetCardProps) => {
  const [selectedLogData, setSelectedLogData] = useState<LogData>(logData);

  const toggleCompleted = async (id: number) => {
    try {
      const response = await axios.patch(
        `http://maco-coding.go.ro:8020/daily-logs/${id}/update`
      );
      setSelectedLogData(response.data);
      console.log(selectedLogData);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handlePress = () => {
    onSelect();
  };

  return (
    <View
      className={`gap-2 rounded-xl border-2 
        ${isSelected ? "border-red-500" : "border-transparent"}`}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        className={
          "bg-white rounded-xl p-2 flex-row justify-between items-center h-14"
        }
      >
        <Text
          className="text-start text-2xl text-black w-4/6 "
          onPress={handlePress}
        >
          {selectedLogData.habitDTO.habitName}
        </Text>
        <View>
          <BouncyCheckBox
            size={35}
            isChecked={selectedLogData.completed}
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
              toggleCompleted(selectedLogData.id);
            }}
          ></BouncyCheckBox>
        </View>
      </TouchableOpacity>
      {isSelected && (
        <View className="bg-gray-200 -mt-4 pt-4 -z-40 rounded-b-xl justify-start p-5">
          <Text className="text-gray-800 text-sm">
            Date created: {logData.habitDTO.dateCreated}
            {"\n"}
            Date updated: {logData.habitDTO.lastUpdated}
            {"\n"}
            Description: {logData.habitDTO.description}
            {"\n"}
            Type: {logData.habitDTO.type}
            {"\n"}
            Occurrence: {logData.habitDTO.occurrence}
            {"\n"}
            Current streak: {logData.habitDTO.currentStreak}
            {"\n"}
            Longest streak: {logData.habitDTO.bestStreak}
            {"\n"}
            Total completions: {logData.habitDTO.totalCount}
            {"\n"}
            Completed: {selectedLogData.completed ? "Yes" : "No"}
            {"\n"}
            Log id: {selectedLogData.id}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SingleTargetCard;
