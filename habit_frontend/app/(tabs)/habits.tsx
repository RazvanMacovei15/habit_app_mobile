import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/top_navigation/topNav";
import HabitCard from "@/components/HabitCard";
import EditCustomButton from "@/components/CustomButton";
import DeleteCustomButton from "@/components/DeleteCustomButton";
import PlusCustomButton from "@/components/PlusCustomButton";
import axios from "axios";

const Habits = () => {
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
    fetchData("http://maco-coding.go.ro:8010/users/1/habits");
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loading spinner
  }

  if (error) {
    return <Text>Error: {error}</Text>; // Show error message
  }

  return (
    <View className="flex-1 flex-col justify-start">
      <TopNav />
      <View className="border-2 border-red-700 flex-1 justify-start p-3 ">
        <View className="h-20 justify-center items-center border-2">
          <Text>Insert daily navigations here</Text>
        </View>
        <ScrollView>
          <View className=" gap-2 justify-start flex-col border-2">
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

        <View className="h-20 items-center justify-around flex-row border-2">
          <EditCustomButton />
          <PlusCustomButton />
          <DeleteCustomButton />
        </View>
      </View>
    </View>
  );
};

export default Habits;
