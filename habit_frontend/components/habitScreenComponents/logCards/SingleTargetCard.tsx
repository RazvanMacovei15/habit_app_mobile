import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
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
  fetchLogs: () => void;
}

const SingleTargetCard = ({
  logData,
  isSelected,
  onSelect,
  fetchLogs,
}: SingleTargetCardProps) => {
  const [selectedLogData, setSelectedLogData] = useState<LogData>(logData);

  const addToCount = async (id: number) => {
    try {
      const response = await axios.patch(
        `http://maco-coding.go.ro:8020/daily-logs/${id}/addUpdate`
      );
      setSelectedLogData(response.data);
      fetchLogs();
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
      <View
        className={
          "bg-white rounded-xl p-2 flex-row justify-between items-center h-14"
        }
      >
        <TouchableOpacity
          className="grow"
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text className="text-start text-2xl text-black ">
            {selectedLogData.habitDTO.habitName}
          </Text>
        </TouchableOpacity>

        <View>
          <BouncyCheckBox
            size={35}
            isChecked={logData.completed}
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
              addToCount(selectedLogData.id);
            }}
          ></BouncyCheckBox>
        </View>
      </View>
      {isSelected && (
        <View className="bg-gray-200 -mt-4 pt-4 -z-40 rounded-b-xl justify-start p-5">
          <Text className="text-gray-800 text-sm">
            Date created: {selectedLogData.habitDTO.dateCreated}
            {"\n"}
            Date updated: {selectedLogData.habitDTO.lastUpdated}
            {"\n"}
            Description: {selectedLogData.habitDTO.description}
            {"\n"}
            Type: {selectedLogData.habitDTO.type}
            {"\n"}
            Occurrence: {selectedLogData.habitDTO.occurrence}
            {"\n"}
            Current streak: {selectedLogData.habitDTO.currentStreak}
            {"\n"}
            Longest streak: {selectedLogData.habitDTO.bestStreak}
            {"\n"}
            Total completions: {selectedLogData.habitDTO.totalCount}
            {"\n"}
            Completed: {selectedLogData.completed ? "Yes" : "No"}
            {"\n"}
            PreviouslyCompleted:{" "}
            {selectedLogData.previousCompleted ? "Yes" : "No"}
            {"\n"}
            Log id: {selectedLogData.id}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SingleTargetCard;
