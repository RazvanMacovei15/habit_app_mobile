import { View, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import TableHeader from "./TableHeader";
import "../../global.css";
import TableEntry from "./TableEntry";
import { useEffect, useState } from "react";
import NavBarButton from "../navigation/NavBarButton";

export default function Table() {
  const [data, setData] = useState([]);
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
    fetchData("http://maco-coding.go.ro:8010/habits/all");
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loading spinner
  }

  if (error) {
    return <Text>Error: {error}</Text>; // Show error message
  }

  // Get headers dynamically based on the fetched data
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <View className="border-4 border-blue-400 mt-2">
      <TableHeader headers={headers} />
      {data.map((entry, index) => (
        <TableEntry key={index} entry={entry} />
      ))}
    </View>
  );
}
