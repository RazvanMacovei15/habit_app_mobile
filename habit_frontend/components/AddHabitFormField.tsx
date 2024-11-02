import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder: string;
  otherStyles?: any;
  keyboardType?: any;
}

const AddHabitFormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}: FormFieldProps) => {
  return (
    <View className={`space-y-2 ${otherStyles} mt-5`}>
      <Text className="text-black text-xl mx-2 mb-2">{title}:</Text>
      <View className="bg-gray-300 mx-2 w-full h-12 flex flex-row px-4 rounded-2xl items-center">
        <TextInput
          className="flex-1 text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  );
};

export default AddHabitFormField;
