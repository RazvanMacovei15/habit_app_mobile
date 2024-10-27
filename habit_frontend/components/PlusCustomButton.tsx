import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { icons } from "../constants";

const EditCustomButton = () => {
  return (
    <TouchableOpacity>
      <Image source={icons.plus as ImageSourcePropType} tintColor={"black"} />
    </TouchableOpacity>
  );
};

export default EditCustomButton;
