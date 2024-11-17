import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { icons } from "../../../constants";

interface PlusCustomButtonProps {
  onPress: () => void;
}

const PlusCustomButton = ({ onPress }: PlusCustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center grow"
    >
      <Image
        source={icons.plus as ImageSourcePropType}
        tintColor={"black"}
        resizeMode="contain"
        className="w-16 h-16"
      />
    </TouchableOpacity>
  );
};

export default PlusCustomButton;
