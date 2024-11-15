import { View, Text, BackHandler } from "react-native";
import React, { useEffect } from "react";
import TopNav from "@/components/navigation/TopNav";
import { usePathname, useRouter } from "expo-router";

const Dashboard = () => {
  const router = useRouter();
  const pathname = usePathname();  // Get the current pathname

  useEffect(() => {
    const backAction = () => {
      // Check if we are on the default route (i.e., index.js)
      if (pathname === "/") {  // Default route for app/index.js
        // Prevent back action on the default route
        return true;  // Prevent the back action
      }
      return false;  // Allow back press for other screens
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();  // Clean up the event listener
    };
  }, [pathname]);  // Listen for pathname changes

  return (
    <View className="bg-gray-200 flex-1">
      <TopNav onPress={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </View>
  );
};

export default Dashboard;
