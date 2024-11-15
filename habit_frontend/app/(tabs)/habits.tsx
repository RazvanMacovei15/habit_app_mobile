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
import { HabitForm } from "../../components/types/HabitForm";
import { DailyLogDTO } from "@/components/types/DailyLogDTO";
import { WeeklyLogDTO } from "@/components/types/WeeklyLogDTO";
import DailyLogScrollView from "@/components/habitScreenComponents/scrollViews/DailyLogScrollView";
import DayByDayNavigation from "@/components/navigation/DayByDayNavigation";
import dayjs from "dayjs";
import WeekByWeekNavigation from "@/components/navigation/WeekByWeekNavigation";
import WeeklyLogScrollView from "@/components/habitScreenComponents/scrollViews/WeeklyLogScrollView";
import { HabitFormDTO } from "@/components/types/HabitFormDTO";

export type LogData = DailyLogDTO | WeeklyLogDTO;

const Habits = () => {
  const { authState } = useAuth();
  const token = authState?.token;
  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedYearWeek, setSelectedYearWeek] = useState(
    dayjs().week() + dayjs().year() * 100
  );

  const incrementDate = () =>
    setSelectedDate(dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD"));

  const decrementDate = () =>
    setSelectedDate(
      dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD")
    );

  const incrementWeek = () => setSelectedYearWeek(selectedYearWeek + 1);
  const decrementWeek = () => setSelectedYearWeek(selectedYearWeek - 1);

  const initialHabitFormState: HabitForm = {
    habitName: "",
    type: "",
    occurrence: "",
    description: "",
    targetCount: "",
  };
  const [habitForm, setHabitForm] = useState(initialHabitFormState);
  const [selectedOccurrence, setSelectedOccurrence] = useState("WEEKLY");

  const [selectedLog, setSelectedLog] = useState<LogData | null>(null);
  const isSelectedLog = selectedLog !== null;

  const [dailyLogData, setDailyLogData] = useState<DailyLogDTO[]>([]);
  const [weeklyLogData, setWeeklyLogData] = useState<WeeklyLogDTO[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchDailyLogsByDate = async (date: string) => {
    setError(null);
    try {
      const response = await axios.get(
        `http://maco-coding.go.ro:8020/daily-logs/date/${date}`
      );
      setDailyLogData(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const retrieveWeeklyLogData = async (endpoint: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint);
      setWeeklyLogData(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const createWeeklyLogsByDate = async (yearWeek: number) => {
    setError(null);
    try {
      const response = await axios.post(
        `http://maco-coding.go.ro:8020/weekly-logs/createWeeklyLogsOnGivenWeek/${yearWeek}`
      );
      setWeeklyLogData(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchLogs = async () => {
    setError(null);
    if (selectedOccurrence === "DAILY") {
      await fetchDailyLogsByDate(selectedDate);
    } else if (selectedOccurrence === "WEEKLY") {
      await retrieveWeeklyLogData(
        `http://maco-coding.go.ro:8020/weekly-logs/getWeeklyLogsByYearWeek/${selectedYearWeek}`
      );
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
      console.log(form);
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
        setHabitForm(initialHabitFormState);
        setSelectedLog(null);
        setEditModalVisible(false);
      });
      fetchLogs();
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

  return (
    <View className="flex flex-col justify-stretch h-full bg-[#FFFFF]">
      <TopNav onPress={fetchLogs} />
      <View className="flex-col flex grow bg-gray-100">
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
              data={dailyLogData}
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
              data={weeklyLogData}
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
      </View>
      <View className="h-20 items-center justify-around flex-row bg-gray-100 border-red-300 rounded-t-3xl shadow-2xl shadow-slate-900">
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
            if (selectedLog?.habitDTO && token) {
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
