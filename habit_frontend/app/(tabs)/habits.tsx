import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import TopNav from "@/components/top_navigation/topNav";
import { icons } from "../../constants";
import BounctCheckBox from "react-native-bouncy-checkbox";

const Habits = () => {
  return (
    <View className="flex-1 flex-col justify-start">
      <TopNav />
      <View className="b flex-1 justify-center gap-2 p-2  bg-blue-200">
        <TouchableOpacity className="bg-yellow-300 rounded-xl p-2 flex-row justify-between items-center">
          <Text className="text-start text-2xl text-black w-5/6">
            Water with salt
          </Text>
          <View>
            <BounctCheckBox
              size={35}
              fillColor="red"
              unFillColor="#FFFFFF"
              disableText={true}
              iconStyle={{
                borderColor: "purple",
              }}
              innerIconStyle={{
                borderWidth: 2,
              }}
              textStyle={{
                fontFamily: "JosefinSans-Regular",
              }}
              onPress={(isChecked: boolean) => {
                console.log(isChecked);
              }}
            ></BounctCheckBox>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="bg-black rounded-xl p-2 flex-row justify-between items-center">
          <Text className="text-start text-2xl text-white ">
            Wake up at 5am
          </Text>
          <View>
            <BounctCheckBox
              size={35}
              disableText={true}
              fillColor="red"
              unFillColor="#FFFFFF"
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{ fontFamily: "JosefinSans-Regular" }}
              onPress={(isChecked: boolean) => {
                console.log(isChecked);
              }}
            ></BounctCheckBox>
          </View>
        </TouchableOpacity>
        <View className="bg-purple-500 rounded-xl p-2 flex-row justify-between items-center">
          <Text className="text-start text-2xl text-white w-5/6">
            Take vitamins and creatine
          </Text>
          <View>
            <BounctCheckBox
              size={35}
              disableText={true}
              fillColor="red"
              unFillColor="#FFFFFF"
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{ fontFamily: "JosefinSans-Regular" }}
              useBuiltInState={true}
              onPress={(isChecked: boolean) => {
                console.log(isChecked);
              }}
            ></BounctCheckBox>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Habits;
