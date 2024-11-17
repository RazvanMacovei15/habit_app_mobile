import { View, Text, Pressable, TouchableOpacity, Alert } from "react-native";
import React from "react";

interface OccurrenceNavigatorProps {
  selectedOccurrence: string;
  setSelectedOccurrence: (occurrence: string) => void;
}

const OccurrenceNavigator = ({
  selectedOccurrence,
  setSelectedOccurrence,
}: OccurrenceNavigatorProps) => {
  const handlePress = (occurrence: string) => {
    setSelectedOccurrence(occurrence);
  };
  const getButtonClasses = (occurrence: string) =>
    selectedOccurrence === occurrence
      ? "bg-red-600  py-2 w-1/3 rounded-lg items-center justify-center"
      : "bg-gray-400  py-2 w-1/3 rounded-lg items-center justify-center";
  return (
    <View className="mx-4 h-10 justify-around items-center bg-gray-100 rounded-xl flex flex-row gap-1">
      <TouchableOpacity
        onPress={() => handlePress("DAILY")}
        className={getButtonClasses("DAILY")}
      >
        <Text>DAILY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress("WEEKLY")}
        className={getButtonClasses("WEEKLY")}
      >
        <Text>WEEKLY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress("MONTHLY")}
        className={getButtonClasses("MONTHLY")}
      >
        <Text>MONTHLY</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OccurrenceNavigator;
