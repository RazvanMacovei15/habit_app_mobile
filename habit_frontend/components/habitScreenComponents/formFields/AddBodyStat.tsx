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

interface AddBodyStatFormFieldProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder: string;
}

const AddBodyStat = ({
  title,
  value,
  placeholder,
  handleChangeText,
}: AddBodyStatFormFieldProps) => {
  return (
    <View className="flex flex-row items-center justify-stretch border rounded-full p-2 my-1">
      <Text className="w-1/3 text-black text-start text-lg ">{title}:</Text>
      <View className="bg-gray-300 grow h-8 flex flex-row px-4 rounded-2xl items-center">
        <TextInput
          className="flex-1 text-gray-800"
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

export default AddBodyStat;
