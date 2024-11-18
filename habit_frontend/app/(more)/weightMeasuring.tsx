import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { format } from "date-fns";
import { BodyStatsForm } from "@/components/types/forms/BodyStatsForm";
import { Link } from "expo-router";
import { WeightForm } from "@/components/types/forms/WeightForm";
import { WeightDTO } from "@/components/types/WeightDTO";
const mockMeasurements = [
  {
    weight: 70,
  },
  {
    weight: 72,
  },
  {
    weight: 68,
  },
  {
    weight: 75,
  },
  {
    weight: 69,
  },
  {
    weight: 71,
  },
  {
    weight: 69,
  },
  {
    weight: 71,
  },
  {
    weight: 71,
  },
  {
    weight: 69,
  },
  {
    weight: 71,
  },
];

const MeasurementsTracking = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<WeightDTO[]>(mockMeasurements);

  const initialWeightForm = {
    weight: "",
  };
  const [weightForm, setWeightForm] = useState<WeightForm>(initialWeightForm);

  const today = format(new Date(), "yyyy-MM-dd");
  return (
    <View className="flex flex-col">
      <View className="grow items-center justify-stretch h-full">
        <Text className="text-3xl p-5 w-full text-center bg-gray-50">
          Body Weight
        </Text>
        <ScrollView className="h-5/6 px-5 w-full bg-gray-200">
          {data.map((measurement, index) => (
            <Pressable
              key={index}
              className={`flex flex-row w-full items-center justify-around ${
                index === 0 ? "" : "border-t border-dotted"
              } py-5`}
            >
              <Text className="text-lg ">{today.toString()}</Text>
              <Text className="text-lg">Weight: {measurement.weight}kg</Text>
            </Pressable>
          ))}
        </ScrollView>
        <View className="w-full items-center justify-center bg-gray-200 px-16 py-2">
          <Pressable
            className="p-1 w-full rounded-3xl"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-xl text-center border border-dashed p-5 w-full rounded-full">
              + add new measurement
            </Text>
          </Pressable>
          {/* // weight form modal */}
        </View>
      </View>
    </View>
  );
};

export default MeasurementsTracking;
