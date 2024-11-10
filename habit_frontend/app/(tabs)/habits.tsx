import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/navigation/TopNavigation/TopNav";
import DeleteCustomButton from "@/components/habitScreenComponents/crudButtons/DeleteCustomButton";
import PlusCustomButton from "@/components/habitScreenComponents/crudButtons/PlusCustomButton";
import EditCustomButton from "@/components/habitScreenComponents/crudButtons/EditCustomButton";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import AddHabitModal from "@/components/modals/AddHabitModal";
import EditHabitModal from "@/components/modals/EditHabitModal";
import OccurrenceNavigator from "@/components/navigation/OccurrenceNavigator";
import { HabitForm } from "../../components/types/HabitForm";
import { HabitDTO } from "../../components/types/HabitDTO";
import { DailyLogDTO } from "@/components/types/DailyLogDTO";
import { WeeklyLogDTO } from "@/components/types/WeeklyLogDTO";
import DailyLogScrollView from "@/components/habitScreenComponents/scrollViews/DailyLogScrollView";
import DayByDayNavigation from "@/components/navigation/DayByDayNavigation";

const Habits = () => {
  const { authState } = useAuth();
  const token = authState?.token;
  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log({ selectedDate });

  const initialHabitFormState = {
    habitName: "",
    type: "",
    occurrence: "",
    description: "",
  };

  const [habitForm, setHabitForm] = useState(initialHabitFormState);
  const [selectedOccurrence, setSelectedOccurrence] = useState("DAILY");

  const [selectedHabit, setSelectedHabit] = useState<HabitDTO | null>(null);
  const isSelected = selectedHabit !== null;

  const [selectedDailyLog, setSelectedDailyLog] = useState<DailyLogDTO | null>(
    null
  );
  const isDailyLogSelected = selectedDailyLog !== null; // Check if a daily log is selected

  const [data, setData] = useState<HabitDTO[]>([]);
  const [dailyLogData, setDailyLogData] = useState<DailyLogDTO[]>([]);
  const [weeklyLogData, setWeeklyLogData] = useState<WeeklyLogDTO[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchData = async (endpoint: string, token: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
    }
  };
  const retrieveDailyLogData = async (endpoint: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint);
      setDailyLogData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
    }
  };
  const retrieveWeeklyLogData = async (endpoint: string, token: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint);
      setWeeklyLogData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
    }
  };
  const deleteData = async (endpoint: string, token: string) => {
    setError(null);
    try {
      const response = await axios.delete(endpoint);
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
      const response = await axios.post(endpoint, habitForm);
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
      const response = await axios.patch(endpoint, habitForm);
      const newData = data.filter((habit) => habit.id !== selectedHabit?.id);
      setData(newData);
    } catch (err: any) {
      setError(err.message);
    } finally {
    }
  };
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
      console.log(habitForm);
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
  const loadDailyLogs = async () => {
    if (token) {
      retrieveDailyLogData("http://maco-coding.go.ro:8020/daily-logs/getAll");
    } else {
      console.error("Token is not available");
    }
  };
  const loadWeeklyLogs = async () => {
    if (token) {
      retrieveWeeklyLogData(
        "http://maco-coding.go.ro:8020/weekly-logs/getAll",
        token
      );
    } else {
      console.error("Token is not available");
    }
  };
  useEffect(() => {
    if (token) {
      fetchDataByOccurrence(token, selectedOccurrence);
      loadDailyLogs();
      loadWeeklyLogs();
      console.log({ selectedDate });
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
  const handleSelectHabit = (habit: HabitDTO | null) => {
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
  const handleSelectDailyLogDTO = (dailyLogDTO: DailyLogDTO | null) => {
    setSelectedDailyLog(dailyLogDTO);
    if (dailyLogDTO) {
      // Update habitForm with the selected habit's attributes
      setHabitForm({
        habitName: dailyLogDTO.habitDTO.habitName,
        type: dailyLogDTO.habitDTO.type,
        occurrence: dailyLogDTO.habitDTO.occurrence,
        description: dailyLogDTO.habitDTO.description,
      });
    } else {
      // Reset habitForm to the initial state if no habit is selected
      setHabitForm(initialHabitFormState);
    }
  };
  return (
    <View className="flex flex-col justify-strech h-full">
      <TopNav onPress={loadDailyLogs} />
      <View className=" flex-col flex grow bg-gray-100">
        <OccurrenceNavigator
          selectedOccurrence={selectedOccurrence}
          setSelectedOccurrence={setSelectedOccurrence}
        />
        <DayByDayNavigation onPress={setSelectedDate} />
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
        <DailyLogScrollView
          loading={false}
          error={error}
          data={dailyLogData}
          selectedHabit={selectedDailyLog}
          onSelect={handleSelectDailyLogDTO}
        />
      </View>
      <View className="h-20 items-center justify-around flex-row bg-gray-100 border-red-300 rounded-t-3xl shadow-2xl shadow-slate-900">
        <EditCustomButton
          isDisabled={!isDailyLogSelected}
          onPress={() => {
            setEditModalVisible(true);
            handleSelectDailyLogDTO(selectedDailyLog);
          }}
        />
        <PlusCustomButton
          onPress={() => {
            setModalVisible(true);
            setHabitForm(initialHabitFormState);
          }}
        />
        <DeleteCustomButton
          isDisabled={!isDailyLogSelected}
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
