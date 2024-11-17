import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
const mockMeasurements = [
  {
    weight: 70,
    waist: 32,
    abdomen: 34,
    chest: 38,
    bicep: 12,
    quad: 22,
    neck: 15,
  },
  {
    weight: 72,
    waist: 33,
    abdomen: 35,
    chest: 39,
    bicep: 13,
    quad: 23,
    neck: 15.5,
  },
  {
    weight: 68,
    waist: 31,
    abdomen: 33,
    chest: 37,
    bicep: 11.5,
    quad: 21.5,
    neck: 14.5,
  },
  {
    weight: 75,
    waist: 34,
    abdomen: 36,
    chest: 40,
    bicep: 13.5,
    quad: 24,
    neck: 16,
  },
  {
    weight: 69,
    waist: 32.5,
    abdomen: 34.5,
    chest: 38.5,
    bicep: 12.5,
    quad: 22.5,
    neck: 15,
  },
  {
    weight: 71,
    waist: 33.5,
    abdomen: 35.5,
    chest: 39.5,
    bicep: 13,
    quad: 23.5,
    neck: 15.5,
  },
  {
    weight: 69,
    waist: 32.5,
    abdomen: 34.5,
    chest: 38.5,
    bicep: 12.5,
    quad: 22.5,
    neck: 15,
  },
  {
    weight: 71,
    waist: 33.5,
    abdomen: 35.5,
    chest: 39.5,
    bicep: 13,
    quad: 23.5,
    neck: 15.5,
  },
];

const MeasurementsTracking = () => {
  return (
    <View className="flex flex-col p-2">
      <View className="grow items-center justify-stretch">
        <ScrollView className="h-5/6 border w-full">
          {mockMeasurements.map((measurement, index) => (
            <Pressable
              key={index}
              className={`w-full items-center justify-center py-4 ${
                index === 0 ? "" : "border-t border-gray-600"
              } px-5`}
            >
              <Text className="text-xl">Entry {index + 1}</Text>
              <Text className="text-lg">Weight: {measurement.weight} kg</Text>
            </Pressable>
          ))}
        </ScrollView>
        <View className="h-1/6 w-full items-center justify-center">
          <Pressable className="p-1 text-green-700 w-full just">
            <Text className="text-xl text-center border border-dashed p-5 w-full">
              + add new measurement
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MeasurementsTracking;
