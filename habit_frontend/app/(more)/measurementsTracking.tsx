import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { format } from "date-fns";
import AddBodyStatsModal from "./addBodyStatModal";
import { BodyStatsForm } from "@/components/types/BodyStatsForm";
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
  const initialBodyStatsForm = {
    weight: "",
    waist: "",
    abdomen: "",
    chest: "",
    bicep: "",
    quad: "",
    neck: "",
  };
  const [bodyForm, setBodyForm] = useState<BodyStatsForm>(initialBodyStatsForm);

  const today = format(new Date(), "yyyy-MM-dd");
  return (
    <View className="flex flex-col">
      <View className="grow items-center justify-stretch h-full">
        <Text className="text-3xl p-5 w-full text-center bg-gray-50">
          Body measurements
        </Text>
        <ScrollView className="h-5/6 px-5 w-full bg-gray-200">
          {mockMeasurements.map((measurement, index) => (
            <Pressable
              key={index}
              className={`flex flex-row w-full items-center justify-around ${
                index === 0 ? "" : "border-t border-dotted"
              } py-5`}
            >
              <Text className="text-lg ">{today.toString()}</Text>
              <Text className="text-lg">Weight: {measurement.weight}kg</Text>
              <Text className="text-lg">{95 - measurement.weight}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <View className="w-full items-center justify-center bg-gray-200 px-16 py-2">
          <Pressable className="p-1 w-full rounded-3xl">
            <Text className="text-xl text-center border border-dashed p-5 w-full rounded-full">
              + add new measurement
            </Text>
            <AddBodyStatsModal
              modalVisible={false}
              setModalVisible={function (value: boolean): void {
                throw new Error("Function not implemented.");
              }}
              bodyStatsForm={initialBodyStatsForm}
              setHabitForm={function (value: any): void {
                throw new Error("Function not implemented.");
              }}
              handleCreateHabit={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MeasurementsTracking;
