import { View, Text } from "react-native";
import React from "react";
import CustomButon from "@/components/CustomButton";
import { useAuth } from "../context/AuthContext";

const More = () => {
  const { authState } = useAuth();

  const logout = async () => {
    const auth = useAuth();
    if (auth.onLogout) {
      auth.onLogout();
    }
  };

  return (
    <View>
      <Text>More</Text>
      <CustomButon handlePress={logout} title={"Log out"} />
    </View>
  );
};

export default More;
