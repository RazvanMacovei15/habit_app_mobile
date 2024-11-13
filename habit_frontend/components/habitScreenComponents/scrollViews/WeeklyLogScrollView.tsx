import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import { useAuth } from "@/app/context/AuthContext";
import { HabitDTO } from "../../types/HabitDTO";
import SingleTargetCard from "../logCards/SingleTargetCard";
import { WeeklyLogDTO } from "@/components/types/WeeklyLogDTO";
import MultiTargetCard from "../logCards/MultiTargetCard";
import { DailyLogDTO } from "@/components/types/DailyLogDTO";
import { LogData } from "../../../app/(tabs)/habits";

interface WeeklyLogScrollViewProps {
  fetchLogs: () => void;
  selectedLog: LogData | null;
  onSelect: (log: LogData | null) => void;
  data: LogData[];
  error: any;
  loading: boolean;
}

const WeeklyLogScrollView = ({
  fetchLogs,
  selectedLog,
  onSelect,
  data,
  error,
  loading,
}: WeeklyLogScrollViewProps) => {
  if (loading) {
    return (
      <View className="grow items-center justify-center">
        <Text className="text-red-600 text-3xl">Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <Text className="grow items-center justify-center">Error: {error}</Text>
    );
  }
  return (
    <ScrollView className="h-1/2 px-2 bg-gray-100 mt-2">
      <View className=" gap-2 justify-start flex-col">
        {data.map((log) =>
          log.habitDTO.targetCount > 1 ? (
            <MultiTargetCard
              fetchLogs={fetchLogs}
              key={log.id}
              isSelected={selectedLog === log}
              onSelect={() => {
                onSelect(selectedLog === log ? null : log);
              }}
              logData={log}
            />
          ) : (
            <SingleTargetCard
              fetchLogs={fetchLogs}
              key={log.id}
              logData={log}
              isSelected={selectedLog === log}
              onSelect={() => {
                onSelect(selectedLog === log ? null : log);
              }}
            />
          )
        )}
      </View>
    </ScrollView>
  );
};

export default WeeklyLogScrollView;
