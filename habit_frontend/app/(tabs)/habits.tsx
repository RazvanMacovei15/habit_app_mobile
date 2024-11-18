import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/navigation/TopNav";
import DeleteCustomButton from "@/components/habitScreenComponents/crudButtons/DeleteCustomButton";
import PlusCustomButton from "@/components/habitScreenComponents/crudButtons/PlusCustomButton";
import EditCustomButton from "@/components/habitScreenComponents/crudButtons/EditCustomButton";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import AddHabitModal from "@/components/modals/AddHabitModal";
import EditHabitModal from "@/components/modals/EditHabitModal";
import OccurrenceNavigator from "@/components/navigation/OccurrenceNavigator";
import { HabitForm } from "../../components/types/forms/HabitForm";
import { DailyLogDTO } from "@/components/types/DailyLogDTO";
import { WeeklyLogDTO } from "@/components/types/WeeklyLogDTO";
import DailyLogScrollView from "@/components/habitScreenComponents/scrollViews/DailyLogScrollView";
import DayByDayNavigation from "@/components/navigation/DayByDayNavigation";
import WeekByWeekNavigation from "@/components/navigation/WeekByWeekNavigation";
import WeeklyLogScrollView from "@/components/habitScreenComponents/scrollViews/WeeklyLogScrollView";
import { HabitFormDTO } from "@/components/types/HabitFormDTO";
import ErrorBoundary from "@/components/modals/ErrorBoundary";
import {
  getISOWeek,
  format,
  getYear,
  getMonth,
  addDays,
  subDays,
} from "date-fns";

export type LogData = DailyLogDTO | WeeklyLogDTO;

const Habits = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const thisWeek = getISOWeek(today);
  const thisMonth = getMonth(today) + 1;
  const thisYear = getYear(today);
  const thisYearWeek = thisWeek + thisYear * 100;

  const { authState } = useAuth();
  const token = authState?.token;
  const [error, setError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [selectedYearWeek, setSelectedYearWeek] = useState(thisYearWeek);
  const [selectedMonth, setSelectedMonth] = useState(thisMonth);

  const incrementDate = () =>
    setSelectedDate(format(addDays(new Date(selectedDate), 1), "yyyy-MM-dd"));

  const decrementDate = () =>
    setSelectedDate(format(subDays(new Date(selectedDate), 1), "yyyy-MM-dd"));

  const incrementWeek = () => setSelectedYearWeek(selectedYearWeek + 1);
  const decrementWeek = () => setSelectedYearWeek(selectedYearWeek - 1);

  const incrementMonth = () => setSelectedMonth(selectedMonth + 1);
  const decrementMonth = () => setSelectedMonth(selectedMonth - 1);

  const initialHabitFormState: HabitForm = {
    habitName: "",
    type: "",
    occurrence: "",
    description: "",
    targetCount: "",
  };

  const [habitForm, setHabitForm] = useState(initialHabitFormState);
  const [selectedOccurrence, setSelectedOccurrence] = useState("DAILY");

  const [selectedLog, setSelectedLog] = useState<LogData | null>(null);
  const isSelectedLog = selectedLog !== null;
  const [logData, setLogData] = useState<LogData[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchDailyLogsByDate = async (date: string) => {
    setError(null);
    try {
      const response = await axios.post(
        `http://maco-coding.go.ro:8020/daily-logs/date/${date}`
      );
      setLogData(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const retrieveDailyLogData = async (endpoint: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint);
      if (response.data.length === 0) {
        await fetchDailyLogsByDate(selectedDate); // Try fetching by date
        console.log("so this is where the problem lies?");
      } else {
        // setDailyLogData(response.data); // Update state only with valid data
        setLogData(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchWeeklyLogsByYearWeek = async (yearweek: number) => {
    setError(null);
    try {
      const response = await axios.post(
        `http://maco-coding.go.ro:8020/weekly-logs/createWeeklyLogsOnGivenWeek/${yearweek}`
      );
      setLogData(response.data);
    } catch (err: any) {
      setError(`Failed to create logs: ${err.message}`);
    }
  };

  const retrieveWeeklyLogData = async (endpoint: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint);
      if (response.data.length === 0) {
        await fetchWeeklyLogsByYearWeek(selectedYearWeek);
      } else {
        setLogData(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Usage in fetchLogs:
  const fetchLogs = async () => {
    setError(null);
    if (selectedOccurrence === "DAILY") {
      const endpoint = `http://maco-coding.go.ro:8020/daily-logs/date/${selectedDate}`;
      await retrieveDailyLogData(endpoint);
    } else if (selectedOccurrence === "WEEKLY") {
      const endpoint = `http://maco-coding.go.ro:8020/weekly-logs/getWeeklyLogsByYearWeek/${selectedYearWeek}`;
      await retrieveWeeklyLogData(endpoint);
    }
  };

  const deleteData = async (endpoint: string) => {
    setError(null);
    try {
      await axios.delete(endpoint);
      fetchLogs(); // Refresh logs after deletion
    } catch (err: any) {
      setError(err.message);
    }
  };

  const createHabit = async (endpoint: string, form: HabitFormDTO) => {
    setError(null);
    try {
      await axios.post(endpoint, form);
      fetchLogs(); // Refresh logs after creation
    } catch (err: any) {
      setError(err.message);
    }
  };

  const update = async (endpoint: string, form: HabitForm) => {
    setError(null);
    try {
      await axios.patch(endpoint, form);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCreateHabit = () => {
    const habitFormDTO = {
      ...habitForm,
      targetCount: Number(habitForm.targetCount), // Convert targetCount to a number
    };
    createHabit(
      "http://maco-coding.go.ro:8020/habits/create",
      habitFormDTO
    ).then(() => {
      setHabitForm(initialHabitFormState);
      setModalVisible(false);
    });
  };

  const handleUpdateHabit = () => {
    if (selectedLog) {
      const endpoint = `http://maco-coding.go.ro:8020/habits/${selectedLog.habitDTO.id}/updateDetails`;
      update(endpoint, habitForm).then(() => {
        fetchLogs();
        setHabitForm(initialHabitFormState);
        setEditModalVisible(false);
      });
    }
  };

  const handleSelectLog = (log: LogData | null) => {
    setSelectedLog(log);
    if (log) {
      setHabitForm({
        habitName: log.habitDTO.habitName,
        type: log.habitDTO.type,
        occurrence: log.habitDTO.occurrence,
        description: log.habitDTO.description,
        targetCount: log.habitDTO.targetCount.toString(),
      });
    } else {
      setHabitForm(initialHabitFormState);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [selectedOccurrence, selectedDate, selectedYearWeek]);

  useEffect(() => {
    if (selectedOccurrence === "DAILY") {
      setSelectedDate(today); // Set selected date to today
    } else if (selectedOccurrence === "WEEKLY") {
      setSelectedYearWeek(thisYearWeek); // Set selected week to the current year-week
    }
  }, [selectedOccurrence]);

  return (
    <View className="flex flex-col justify-stretch h-full mb-10">
      <TopNav onPress={fetchLogs} />
      <View className="flex-col flex grow">
        <OccurrenceNavigator
          selectedOccurrence={selectedOccurrence}
          setSelectedOccurrence={setSelectedOccurrence}
        />
        {selectedOccurrence === "DAILY" && (
          <View className="grow">
            <DayByDayNavigation
              selectedDate={selectedDate}
              incrementDate={incrementDate}
              decrementDate={decrementDate}
            />
            <DailyLogScrollView
              fetchLogs={() => fetchLogs()}
              loading={false}
              error={error}
              data={logData}
              selectedLog={selectedLog}
              onSelect={handleSelectLog}
            />
          </View>
        )}
        {selectedOccurrence === "WEEKLY" && (
          <View className="grow">
            <WeekByWeekNavigation
              onPress={fetchLogs}
              selectedYearWeek={selectedYearWeek}
              incrementWeek={incrementWeek}
              decrementWeek={decrementWeek}
            />
            <WeeklyLogScrollView
              fetchLogs={fetchLogs}
              selectedLog={selectedLog}
              onSelect={handleSelectLog}
              data={logData}
              error={error}
              loading={false}
            />
          </View>
        )}
        {selectedOccurrence === "MONTHLY" && (
          <Text className="text-center text-2xl">
            Monthly logs will be displayed here
          </Text>
        )}
        <ErrorBoundary>
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
        </ErrorBoundary>
      </View>
      <View className="h-20 items-center justify-around flex-row bg-gray-100">
        <EditCustomButton
          isDisabled={!isSelectedLog}
          onPress={() => setEditModalVisible(true)}
        />
        <PlusCustomButton
          onPress={() => {
            setModalVisible(true);
            setHabitForm(initialHabitFormState);
          }}
        />
        <DeleteCustomButton
          isDisabled={!isSelectedLog}
          selectedHabit={selectedLog?.habitDTO ?? null}
          onPress={() => {
            if (selectedLog?.habitDTO) {
              const endpoint = `http://maco-coding.go.ro:8020/habits/${selectedLog.habitDTO.id}/delete`;
              deleteData(endpoint);
              setSelectedLog(null);
            }
          }}
        />
      </View>
    </View>
  );
};

export default Habits;
