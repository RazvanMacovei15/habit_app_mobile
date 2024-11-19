import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { format } from "date-fns";
import { Link } from "expo-router";
import { WeightForm } from "@/components/types/forms/WeightForm";
import { WeightDTO } from "@/components/types/WeightDTO";
import AddWeightModal from "@/components/modals/AddWeightModal";

const MeasurementsTracking = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<WeightDTO[]>([]);

  const initialWeightForm = {
    weight: 0,
  };
  const [weightForm, setWeightForm] = useState<WeightForm>(initialWeightForm);

  const today = format(new Date(), "yyyy-MM-dd");

  const handleWeightStats = () => {
    const newBodyStats: WeightDTO = {
      weight: weightForm.weight,
    };
    const newData = [...data, newBodyStats];
    setData(newData);
    setModalVisible(false);
    setWeightForm(initialWeightForm);
  };

  const GOAL = 78;

  const getWeightDifference = () => {
    if (data.length < 2) return 0;
    const lastWeight = data[data.length - 1].weight;
    const penultimateWeight = data[data.length - 2].weight;
    return GOAL - lastWeight;
  };

  const weightDifference = getWeightDifference();
  const isPositive = weightDifference > 0;
  const differenceColor = isPositive ? "text-green-500" : "text-red-500";
  const arrow = isPositive ? "↑" : "↓";

  return (
    <View className="flex flex-col">
      <View className="grow items-center justify-stretch h-full">
        <Text className="text-3xl p-5 w-full text-center bg-gray-300">
          Body Weight
        </Text>
        <ScrollView className="h-5/6 px-5 w-full bg-gray-200">
          {[...data].reverse().map((measurement, index) => (
            <Pressable
              key={index}
              className={`flex flex-row w-full items-center justify-around ${
                index === 0 ? "" : "border-t border-dotted"
              } py-5`}
            >
              <Text className="text-lg ">{today.toString()}</Text>
              <Text className="text-lg">Weight: {measurement.weight}kg</Text>
              <Text className="text-lg">
                {(GOAL - measurement.weight).toFixed(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <View
          className={`flex flex-row w-full bg-gray-300 items-center justify-center py-3 ${differenceColor}`}
        >
          <Text className={`text-lg`}>Distance to weight goal: </Text>
          <Text className={`text-lg ${differenceColor}`}>
            {Math.abs(weightDifference).toFixed(1)}kg {arrow}
          </Text>
        </View>
        <View className="w-full items-center justify-center bg-gray-300 px-16 py-2">
          <Pressable
            className="p-1 w-full rounded-3xl"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-xl text-center border border-dashed p-5 w-full rounded-full">
              + add new measurement
            </Text>
          </Pressable>
          <AddWeightModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            weightForm={weightForm}
            setWeightForm={setWeightForm}
            handleCreateWeight={handleWeightStats}
            lastWeight={data[data.length - 1]?.weight}
          />
        </View>
      </View>
    </View>
  );
};

export default MeasurementsTracking;
