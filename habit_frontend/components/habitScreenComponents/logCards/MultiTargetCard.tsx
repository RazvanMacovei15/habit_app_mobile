import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { LogData } from "@/app/(tabs)/habits";
import axios from "axios";

interface MultiTargetCardProps {
  logData: LogData;
  isSelected: boolean;
  onSelect: () => void;
  fetchLogs: () => void;
}

const MultiTargetCard = ({
  logData,
  isSelected,
  onSelect,
  fetchLogs,
}: MultiTargetCardProps) => {
  const [selectedLogData, setSelectedLogData] = useState<LogData>(logData);

  const addUpdate = async (id: number) => {
    try {
      const url =
        "yearWeek" in logData
          ? `http://maco-coding.go.ro:8020/weekly-logs/${id}/addUpdate`
          : `http://maco-coding.go.ro:8020/daily-logs/${id}/addUpdate`;
      const response = await axios.patch(url);
      setSelectedLogData(response.data);
      fetchLogs();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const fetchLogData = async () => {
    try {
      const url =
        "yearWeek" in logData
          ? `http://maco-coding.go.ro:8020/weekly-logs/yearWeek/${logData.yearWeek}/habit/${logData.habitDTO.id}`
          : `http://maco-coding.go.ro:8020/daily-logs/${logData.id}`;
      const response = await axios.get(url);
      setSelectedLogData(response.data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const decrementUpdate = async (id: number) => {
    try {
      const url =
        "yearWeek" in logData
          ? `http://maco-coding.go.ro:8020/weekly-logs/${id}/decrementUpdate`
          : `http://maco-coding.go.ro:8020/daily-logs/${id}/decrementUpdate`;
      const response = await axios.patch(url);
      setSelectedLogData(response.data);
      fetchLogs();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handlePress = () => {
    onSelect();
  };

  useEffect(() => {}, [selectedLogData]);

  return (
    <View
      className={`gap-2 rounded-xl border-2 
        ${isSelected ? "border-red-500" : "border-transparent"} ${logData.completed ? "bg-green-700" : "bg-white"}`}
    >
      <View
        className={
          "bg-white rounded-xl p-2 flex-row justify-around items-center h-14"
        }
      >
        <TouchableOpacity
          className=" w-8/12 h-full justify-center"
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text className="text-start text-2xl text-black ">
            {logData.habitDTO.habitName}
          </Text>
        </TouchableOpacity>

        <View className="flex flex-row items-center justify-between w-4/12 ">
          <TouchableOpacity
            className="h-full"
            onPress={() => decrementUpdate(selectedLogData.id)}
          >
            <Text className="text-5xl text-red-600 w-6 h-full text-center align-middle">
              -
            </Text>
          </TouchableOpacity>

          <Text
            className={`text-2xl h-full align-middle text-center ${
              selectedLogData.completed ? "text-green-700" : "text-gray-600"
            }`}
          >
            {selectedLogData.currentCount} /{" "}
            {selectedLogData.habitDTO.targetCount}
          </Text>
          <TouchableOpacity
            className="h-full"
            onPress={() => addUpdate(selectedLogData.id)}
          >
            <Text className="text-4xl text-green-700 h-full text-center align-middle w-8">
              +
            </Text>
          </TouchableOpacity>
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
            Target: {selectedLogData.habitDTO.targetCount}
            {"\n"}
            Occurrence: {selectedLogData.habitDTO.occurrence}
            {"\n"}
            Current streak: {selectedLogData.habitDTO.currentStreak}
            {"\n"}
            Longest streak: {selectedLogData.habitDTO.bestStreak}
            {"\n"}
            Total completions: {selectedLogData.habitDTO.totalCount}
            {"\n"}
            Current count: {selectedLogData.currentCount}
            {"\n"}
            Completed: {selectedLogData.completed ? "Yes" : "No"}
            {"\n"}
            Previous Week: {selectedLogData.previousCompleted ? "Yes" : "No"}
            {"\n"}
            Log id: {selectedLogData.id}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MultiTargetCard;
