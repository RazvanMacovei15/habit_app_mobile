import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/navigation/TopNavigation/topNav";

import DeleteCustomButton from "@/components/habitScreenComponents/DeleteCustomButton";
import PlusCustomButton from "@/components/habitScreenComponents/PlusCustomButton";
import EditCustomButton from "@/components/habitScreenComponents/EditCustomButton";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import HabitsScrollView from "../../components/habitScreenComponents/HabitsScrollView";
import AddHabitModal from "@/components/modals/AddHabitModal";
import EditHabitModal from "@/components/modals/EditHabitModal";
import OccurrenceNavigator from "@/components/navigation/OccurrenceNavigator";

export type Habit = {
  id: number;
  habitName: string;
  type: string;
  occurrence: string;
  description: string;
  currentStreak: number;
  bestStreak: number;
  totalCount: number;
  dateCreated: string;
  lastUpdated: string;
  completed: boolean;
};

export type HabitForm = {
  habitName: string;
  type: string;
  occurrence: string;
  description: string;
};

const Habits = () => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  const isSelected = selectedHabit !== null;

  const [data, setData] = useState<Habit[]>([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { authState } = useAuth();
  const token = authState?.token;

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [selectedOccurrence, setSelectedOccurrence] = useState("DAILY");

  const fetchData = async (endpoint: string, token: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log("Data: ", response.data);
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
    habitForm: HabitForm
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
  const update = async (
    endpoint: string,
    token: string,
    habitForm: HabitForm
  ) => {
    setError(null);
    try {
      const response = await axios.patch(endpoint, habitForm, {
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
        fetchData("http://maco-coding.go.ro:8020/habits/all", token);
        setModalVisible(false);
      });
    } else {
      console.error("Token is not available");
    }
  };

  const handleUpdateHabit = () => {
    if (token) {
      update(
        `http://maco-coding.go.ro:8020/habits/${selectedHabit?.id}/updateDetails`,
        token,
        habitForm
      ).then(() => {
        // Reset form after save
        setHabitForm(initialHabitFormState);
        fetchDataByOccurrence(token, selectedOccurrence);
        setEditModalVisible(false);
      });
    } else {
      console.error("Token is not available");
    }
  };

  useEffect(() => {
    if (token) {
      // fetchData("http://maco-coding.go.ro:8020/habits/all", token);
      fetchDataByOccurrence(token, selectedOccurrence);
    }
  }, [selectedOccurrence]);

  const fetchDataByOccurrence = async (token: string, occurrence: string) => {
    if (token) {
      fetchData(
        `http://maco-coding.go.ro:8020/habits/allByOccurrence/${occurrence}`,
        token
      );
    }
  };

  const initialHabitFormState = {
    habitName: "",
    type: "",
    occurrence: "",
    description: "",
  };

  const [habitForm, setHabitForm] = useState(initialHabitFormState);

  const handleSelectHabit = (habit: Habit | null) => {
    setSelectedHabit(habit);
    if (habit) {
      // Update habitForm with the selected habit's attributes
      setHabitForm({
        habitName: habit.habitName,
        type: habit.type,
        occurrence: habit.occurrence,
        description: habit.description,
      });
    } else {
      // Reset habitForm to the initial state if no habit is selected
      setHabitForm(initialHabitFormState);
    }
  };

  return (
    <View className="flex flex-col justify-strech h-full">
      <TopNav />
      <View className=" flex-col flex grow bg-gray-100">
        <OccurrenceNavigator
          selectedOccurrence={selectedOccurrence}
          setSelectedOccurrence={setSelectedOccurrence}
        />
        <Text className="h-10 text-center align-middle">
          {"<---            "} Day by day navigation here {"             --->"}
        </Text>
        <EditHabitModal
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
          habitForm={habitForm}
          setHabitForm={setHabitForm}
          handleUpdate={handleUpdateHabit}
        />
        <AddHabitModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          habitForm={habitForm}
          handleCreateHabit={handleCreateHabit}
          setHabitForm={setHabitForm}
        />
        <HabitsScrollView
          loading={false}
          error={error}
          data={data}
          selectedHabit={selectedHabit}
          onSelect={handleSelectHabit}
        />
      </View>
      <View className="h-20 items-center justify-around flex-row bg-gray-100 border-red-300 rounded-t-3xl shadow-2xl shadow-slate-900">
        <EditCustomButton
          isDisabled={!isSelected}
          onPress={() => {
            setEditModalVisible(true);
            handleSelectHabit(selectedHabit);
          }}
        />
        <PlusCustomButton
          onPress={() => {
            setModalVisible(true);
            setHabitForm(initialHabitFormState);
          }}
        />
        <DeleteCustomButton
          isDisabled={!isSelected}
          selectedHabit={selectedHabit}
          onPress={() => {
            console.log("Delete button pressed");
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
  );
};

export default Habits;
