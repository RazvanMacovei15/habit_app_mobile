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
      <Image
        source={icons.edit as ImageSourcePropType}
        className="w-10 h-10"
        tintColor={"black"}
      />
    </TouchableOpacity>
  );
};

export default EditCustomButton;
