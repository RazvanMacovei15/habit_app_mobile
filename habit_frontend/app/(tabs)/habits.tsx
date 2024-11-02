import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/top_navigation/topNav";

import DeleteCustomButton from "@/components/DeleteCustomButton";
import PlusCustomButton from "@/components/PlusCustomButton";
import EditCustomButton from "@/components/EditCustomButton";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import HabitsScrollView from "../../components/HabitsScrollView";
import AddHabitFormField from "@/components/AddHabitFormField";
import AddDescriptionFormField from "@/components/AddDescriptionFormField";

export type Habit = {
  id: number;
  habitName: string;
  completed: boolean;
  currentStreak: number;
};

const Habits = () => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  const isSelected = selectedHabit !== null;

  const handleSelectHabit = (habit: Habit | null) => {
    setSelectedHabit(habit);
    console.log("Habit selected: ", habit);
  };

  const [data, setData] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authState } = useAuth();
  const token = authState?.token;

  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async (endpoint: string, token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (endpoint: string, token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newData = data.filter((habit) => habit.id !== selectedHabit?.id);
      setData(newData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData("http://maco-coding.go.ro:8010/habits/all", token);
    }
  }, []);

  const [habitForm, setHabitForm] = useState({
    habitName: "",
    habitType: "",
    habitCategory: "",
    habitDescription: "",
  });

  return (
    <View className="flex-1 flex-col justify-start h-full">
      <TopNav />
      <View className=" flex-1 flex h-5/6 bg-gray-100">
        <View className="mx-4 h-20 justify-center items-center border-2 bg-gray-100 rounded-3xl">
          <Text>Insert daily navigations here</Text>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View className="mt-52 mx-2 p-2 min-h-[390px] bg-white items-center justify-evenly flex flex-col shadow-2xl shadow-slate-900 rounded-2xl">
            <Text className="text-xl">Add habit</Text>
            <AddHabitFormField
              title={"Name"}
              value={habitForm.habitName}
              handleChangeText={(e) =>
                setHabitForm({
                  ...habitForm,
                  habitName: e,
                })
              }
              placeholder={"Name of the habit"}
            />
            <Text className="text-sm h-10 bg-gray-300 rounded-xl text-center align-middle w-full">
              DROPDOWN PLACEHOLDER
            </Text>
            <Text className="text-sm bg-gray-300 h-10 rounded-xl text-center align-middle w-full">
              DROPDOWN PLACEHOLDER
            </Text>
            <AddDescriptionFormField
              title={"Description"}
              value={habitForm.habitDescription}
              handleChangeText={(e) =>
                setHabitForm({
                  ...habitForm,
                  habitDescription: e,
                })
              }
              placeholder={"Write a short description"}
            />
            <View className="flex flex-row w-full justify-between">
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                className="items-center justify-center bg-green-700 w-40 h-10 rounded-xl"
              >
                <Text className="text-md text-white">SAVE</Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                className="items-center justify-center bg-red-700 w-40 h-10 rounded-xl"
              >
                <Text className="text-md text-white">CANCEL</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <HabitsScrollView
          loading={loading}
          error={error}
          data={data}
          selectedHabit={selectedHabit}
          onSelect={handleSelectHabit}
        />
        <View className="h-20 items-center justify-around flex-row bg-gray-100 border-red-300 rounded-t-3xl shadow-2xl shadow-slate-900">
          <EditCustomButton isDisabled={!isSelected} />
          <PlusCustomButton onPress={() => setModalVisible(true)} />
          <DeleteCustomButton
            isDisabled={!isSelected}
            selectedHabit={selectedHabit}
            onPress={() => {
              console.log("Delete button pressed");
              if (selectedHabit && token) {
                deleteData(
                  `http://maco-coding.go.ro:8010/habits/${selectedHabit.id}/delete`,
                  token
                );
                setSelectedHabit(null);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Habits;
