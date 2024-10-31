import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import HabitCard from "./HabitCard";

const HabitsScrollView = () => {
  interface Habit {
    username: string;
    userId: number;
    habitId: number;
    habitName: string;
    habitCompleted: boolean;
    currentStreak: number;
  }

  const [data, setData] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API based on the endpoint
  const fetchData = async (endpoint: string) => {
    setLoading(true); // Start loading spinner when fetching data
    setError(null); // Clear previous errors
    try {
      const response = await axios.get(endpoint);
      setData(response.data); // Assuming response.data is an array of objects
    } catch (err: any) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Initial fetch for the default data
  useEffect(() => {
    fetchData("http://maco-coding.go.ro:8010/users/52/habits");
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
    <ScrollView className="grow border-green-400">
      <View className=" gap-2 justify-start flex-col">
        {data.map((item, key) => (
          <HabitCard
            key={key}
            userId={item.userId}
            username={item.username}
            habitId={item.habitId}
            habit={item.habitName}
            habitCompleted={item.habitCompleted}
            currentStreak={item.currentStreak}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HabitsScrollView;
