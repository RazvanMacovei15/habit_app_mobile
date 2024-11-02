import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
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
import CustomDropdown from "@/components/CustomDropdown";

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
  const [types, setTypes] = useState<string[]>([]);
  const [occurrences, setOccurrences] = useState<string[]>([]);
  const [error, setError] = useState(null);

  const { authState } = useAuth();
  const token = authState?.token;

  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async (endpoint: string, token: string) => {
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
    }
  };

  const fetchOccurences = async (endpoint: string, token: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOccurrences(response.data);
      console.log("Occurrences: ", response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
    }
  };
  const fetchTypes = async (endpoint: string, token: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTypes(response.data);
      console.log("Types: ", response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
    }
  };

  const deleteData = async (endpoint: string, token: string) => {
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
    }
  };

  const createHabit = async (
    endpoint: string,
    token: string,
    habitForm: {
      habitName: string;
      type: string;
      occurrence: string;
      description: string;
    }
  ) => {
    setError(null);
    try {
      const response = await axios.post(endpoint, habitForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newData = data.filter((habit) => habit.id !== selectedHabit?.id);
      setData(newData);
    } catch (err: any) {
      setError(err.message);
    } finally {
    }
  };

  // Example call to createHabit function with endpoint, token, and habitForm
  const handleCreateHabit = () => {
    if (token) {
      createHabit(
        "http://maco-coding.go.ro:8020/habits/create",
        token,
        habitForm
      ).then(() => {
        // Reset form after save
        setHabitForm(initialHabitFormState);
        setModalVisible(false);
        fetchData("http://maco-coding.go.ro:8020/habits/all", token);
      });
    } else {
      console.error("Token is not available");
    }
  };

  useEffect(() => {
    if (token) {
      fetchData("http://maco-coding.go.ro:8020/habits/all", token);
      fetchTypes("http://maco-coding.go.ro:8020/api/enums/types", token);
      fetchOccurences(
        "http://maco-coding.go.ro:8020/api/enums/occurrences",
        token
      );
    }
  }, []);

  const initialHabitFormState = {
    habitName: "",
    type: "",
    occurrence: "",
    description: "",
  };

  const [habitForm, setHabitForm] = useState(initialHabitFormState);

  return (
    <View className="flex-1 flex-col justify-start h-full">
      <TopNav />
      <View className=" flex-1 flex h-5/6 bg-gray-100">
        <View className="mx-4 h-20 justify-center items-center border-2 bg-gray-100 rounded-3xl">
          <Text>Insert daily navigations here</Text>
        </View>
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(!modalVisible)}
          hasBackdrop={true}
          backdropColor="black"
          statusBarTranslucent={false}
          backdropOpacity={0.4}
          backdropTransitionInTiming={25}
          backdropTransitionOutTiming={25}
          onBackButtonPress={() => setModalVisible(!modalVisible)}
        >
          <View className="border-2  mx-2 p-2 bg-white items-center justify-evenly flex flex-col shadow-2xl shadow-slate-900 rounded-2xl">
            <AddHabitFormField
              title={"NAME"}
              value={habitForm.habitName}
              handleChangeText={(e) =>
                setHabitForm({
                  ...habitForm,
                  habitName: e,
                })
              }
              placeholder={"Name of the habit"}
            />

            <CustomDropdown
              data={types}
              title="type:"
              onSelectValue={(e: string) =>
                setHabitForm({
                  ...habitForm,
                  type: e,
                })
              }
            />
            <CustomDropdown
              data={occurrences}
              title="occurrence:"
              onSelectValue={(e: string) => {
                setHabitForm({
                  ...habitForm,
                  occurrence: e,
                });
              }}
            />
            <AddDescriptionFormField
              title={"Description"}
              value={habitForm.description}
              handleChangeText={(e) => {
                setHabitForm({
                  ...habitForm,
                  description: e,
                });
              }}
              placeholder={"Write a short description"}
            />
            <View className="flex flex-row w-full justify-between m-5">
              <Pressable
                onPress={() => handleCreateHabit()}
                className="items-center justify-center bg-green-700 w-1/2 h-10 rounded-xl"
              >
                <Text className="text-md text-white">SAVE</Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                className="items-center justify-center bg-red-700 w-1/2 h-10 rounded-xl"
              >
                <Text className="text-md text-white">CANCEL</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <HabitsScrollView
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
              if (selectedHabit && token) {
                deleteData(
                  `http://maco-coding.go.ro:8020/habits/${selectedHabit.id}/delete`,
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
