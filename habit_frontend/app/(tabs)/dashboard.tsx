import { View, Text, BackHandler, Alert } from "react-native";
import React, { useCallback, useEffect } from "react";
import TopNav from "@/components/navigation/TopNav";
import { useFocusEffect, usePathname, useRouter } from "expo-router";

const Dashboard = () => {

  // Exit app when back button is pressed
  const exitApp = () => {
    BackHandler.exitApp();
  };

  // Handle back button on this specific screen
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Customize the behavior as needed (e.g., show confirmation dialog)
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Yes', onPress: exitApp }
          ]
        );
        return true; // Prevent default behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Clean up the event listener when the screen loses focus
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );
 
  return (
    <View className="bg-gray-200 flex-1">
      <TopNav onPress={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </View>
  );
};

export default Dashboard;
