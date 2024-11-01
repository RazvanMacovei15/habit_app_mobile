import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import HabitCard from "./HabitCard";
import { useAuth } from "@/app/context/AuthContext";
import { Habit } from "../app/(tabs)/habits";

interface HabitsScrollView {
  selectedHabit: Habit | null;
  onSelect: (habit: Habit | null) => void;
}

const HabitsScrollView = ({ selectedHabit, onSelect }: HabitsScrollView) => {
  const [data, setData] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authState } = useAuth();
  const token = authState?.token;

  // Fetch data from the API based on the endpoint
  const fetchData = async (endpoint: string, token: string) => {
    setLoading(true); // Start loading spinner when fetching data
    setError(null); // Clear previous errors
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data); // Assuming response.data is an array of objects
    } catch (err: any) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const deleteData = async (endpoint: string, token: string) => {
    setLoading(true); // Start loading spinner when fetching data
    setError(null); // Clear previous errors
    try {
      const response = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchData("http://maco-coding.go.ro:8010/habits/all", token); // Re-fetch data after deletion
    } catch (err: any) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Initial fetch for the default data
  useEffect(() => {
    if (token) {
      fetchData("http://maco-coding.go.ro:8010/habits/all", token);
    }
  }, []);

  if (loading) {
    return <ActivityIndicator className="grow" size="large" color="#0000ff" />; // Show loading spinner
  }

  if (error) {
    return (
      <Text className="grow items-center justify-center">Error: {error}</Text>
    ); // Show error message
  }
  return (
    <ScrollView className="grow px-4 bg-gray-100 mt-2">
      <View className=" gap-2 justify-start flex-col">
        {data.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            isSelected={selectedHabit === habit}
            onSelect={() => onSelect(selectedHabit === habit ? null : habit)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HabitsScrollView;
