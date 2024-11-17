import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { BodyStatsForm } from "@/components/types/BodyStatsForm";
import { useAuth } from "../context/AuthContext";

interface AddBodyStatsModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  bodyStatsForm: BodyStatsForm;
  setHabitForm: (value: any) => void;
  handleCreateHabit: () => void;
}

const AddBodyStatsModal = ({
  modalVisible,
  setModalVisible,
  bodyStatsForm,
  setHabitForm,
  handleCreateHabit,
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
        <View className="border-2  mx-2 p-2 bg-white items-center justify-evenly flex flex-col shadow-2xl shadow-slate-900 rounded-2xl">
          <View className="flex flex-row w-full justify-between m-5">
            <Pressable
              onPress={() => handleCreateHabit()}
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
