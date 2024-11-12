import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../../../constants";

interface TargetNumberFormFieldProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder: string;
}

const AddTargetNumberFormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
}: TargetNumberFormFieldProps) => {
  return (
    <View className="">
      <Text className="text-black text-xl mx-2 my-1">{title}:</Text>
      <View className="bg-gray-300 mx-2 w-full h-12 flex flex-row px-4 rounded-2xl items-center">
        <TextInput
          style={{ flex: 1, color: "#4a4a4a" }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default AddTargetNumberFormField;
