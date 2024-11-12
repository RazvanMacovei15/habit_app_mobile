import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { LogData } from "@/app/(tabs)/habits";

interface MultiTargetCardProps {
  logData: LogData;
  isSelected: boolean;
  onSelect: () => void;
}

const MultiTargetCard = ({
  logData,
  isSelected,
  onSelect,
}: MultiTargetCardProps) => {
  const [selectedLogData, setSelectedLogData] = useState<LogData>(logData);

  const toggleCompleted = async (id: number) => {
    try {
      //TODO : method when weekly log is completed
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
          "bg-white rounded-xl p-2 flex-row justify-around items-center h-14"
        }
      >
        <Text
          className="text-start text-2xl text-black w-4/6 "
          onPress={handlePress}
        >
          {logData.habitDTO.habitName}
        </Text>
        <View className="flex flex-row grow items-center justify-center">
          <TouchableOpacity>
            <Text className="text-5xl text-red-600 w-10 h-12 text-center align-middle">
              -
            </Text>
          </TouchableOpacity>

          <Text
            // style={styles.text}
            className="text-2xl h-full align-middle inline-block text-center mx-2 "
          >
            {logData.currentCount} /{logData.habitDTO.targetCount}
          </Text>
          <TouchableOpacity>
            <Text className="text-5xl text-green-600 h-12 text-center align-middle w-10">
              +
            </Text>
          </TouchableOpacity>
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
            Target: {logData.habitDTO.targetCount}
            {"\n"}
            Occurrence: {logData.habitDTO.occurrence}
            {"\n"}
            Current streak: {logData.habitDTO.currentStreak}
            {"\n"}
            Longest streak: {logData.habitDTO.bestStreak}
            {"\n"}
            Total completions: {logData.habitDTO.totalCount}
            {"\n"}
            Current count: {logData.currentCount}
            {"\n"}
            Previous Week: {logData.previousCompleted ? "Yes" : "No"}
            {"\n"}
            Log id: {logData.id}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MultiTargetCard;
