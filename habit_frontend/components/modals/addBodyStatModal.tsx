import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { useAuth } from "../../app/context/AuthContext";
import { BodyStatsForm } from "@/components/types/BodyStatsForm";
import AddHabitFormField from "@/components/habitScreenComponents/formFields/AddHabitFormField";
import AddBodyStat from "@/components/habitScreenComponents/formFields/AddBodyStat";

interface AddBodyStatsModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  bodyStatsForm: BodyStatsForm;
  setHabitForm: (value: any) => void;
  handleCreateBodyStats: () => void;
}

const AddBodyStatsModal = ({
  modalVisible,
  setModalVisible,
  bodyStatsForm,
  setHabitForm,
  handleCreateBodyStats,
}: AddBodyStatsModalProps) => {
  const { authState } = useAuth();

  const [bodyForm, setBodyForm] = useState<BodyStatsForm>({
    ...bodyStatsForm,
  });

  const initialBodyStatsForm = {
    weight: "",
    waist: "",
    abdomen: "",
    chest: "",
    bicep: "",
    quad: "",
    neck: "",
  };

  return (
    <>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        hasBackdrop={true}
        backdropColor="black"
        statusBarTranslucent={false}
        backdropOpacity={0.4}
        backdropTransitionInTiming={25}
        backdropTransitionOutTiming={25}
        onBackButtonPress={() => setModalVisible(!modalVisible)}
      >
        <View className="w-full gap-1 p-2 bg-white items-center justify-evenly flex flex-col shadow-2xl shadow-slate-900 rounded-2xl">
          <AddBodyStat
            title={"Weight"}
            value={""}
            handleChangeText={function (text: string): void {
              throw new Error("Function not implemented.");
            }}
            placeholder={""}
          />
          <AddBodyStat
            title={"Waist"}
            value={""}
            handleChangeText={function (text: string): void {
              throw new Error("Function not implemented.");
            }}
            placeholder={""}
          />
          <AddBodyStat
            title={"Abdomen"}
            value={""}
            handleChangeText={function (text: string): void {
              throw new Error("Function not implemented.");
            }}
            placeholder={""}
          />
          <AddBodyStat
            title={"Chest"}
            value={""}
            handleChangeText={function (text: string): void {
              throw new Error("Function not implemented.");
            }}
            placeholder={""}
          />
          <AddBodyStat
            title={"Bicep"}
            value={""}
            handleChangeText={function (text: string): void {
              throw new Error("Function not implemented.");
            }}
            placeholder={""}
          />
          <AddBodyStat
            title={"Quad"}
            value={""}
            handleChangeText={function (text: string): void {
              throw new Error("Function not implemented.");
            }}
            placeholder={""}
          />
          <AddBodyStat
            title={"Neck"}
            value={""}
            handleChangeText={function (text: string): void {
              throw new Error("Function not implemented.");
            }}
            placeholder={""}
          />
          <View className="flex flex-row w-full justify-between m-5">
            <Pressable
              onPress={() => handleCreateBodyStats()}
              className="items-center justify-center bg-green-700 w-1/2 h-10 rounded-xl"
            >
              <Text className="text-md text-white">SAVE</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              className="items-center justify-center bg-red-700 w-1/2 h-10 rounded-xl"
            >
              <Text className="text-md text-white">CANCEL</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AddBodyStatsModal;
