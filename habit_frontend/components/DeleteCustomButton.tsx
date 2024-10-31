import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { icons } from "../constants";

interface DeleteCustomButtonProps {
  isDisabled?: boolean;
}

const EditCustomButton = ({ isDisabled = true }: DeleteCustomButtonProps) => {
  return (
    <TouchableOpacity>
      <Image
        source={icons.deletePNG as ImageSourcePropType}
        className={`w-10 h-10 ${isDisabled ? "opacity-30" : ""}`}
        tintColor={"black"}
      />
    </TouchableOpacity>
  );
};

export default EditCustomButton;
