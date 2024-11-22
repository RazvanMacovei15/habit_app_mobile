import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { WeightForm } from "../types/forms/WeightForm";
import Modal from "react-native-modal";
import AddBodyStat from "../habitScreenComponents/formFields/AddBodyStat";
import WheelPicker, {
  withVirtualized,
} from "@quidone/react-native-wheel-picker";
import { set } from "date-fns";
import { WeightEntryDTO } from "../types/WeightEntryDTO";

interface AddWeightEntryModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  weightEntry: WeightEntryDTO;
  setWeightEntry: (value: any) => void;
  handleAddWeight: () => void;
}

const data = [...Array(200).keys()].map((index1) => ({
  value: index1,
  label: index1.toString(),
}));
const data2 = [...Array(10).keys()].map((index) => ({
  value: index,
  label: index.toString(),
}));

const AddWeightEntryModal = ({
  modalVisible,
  setModalVisible,
  weightEntry,
  setWeightEntry,
  handleAddWeight,
}: AddWeightEntryModalProps) => {

  const [isChanging, setIsChanging] = useState(false); // Track whether a value is actively being changed
  
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(!modalVisible)}
      hasBackdrop={true}
      backdropColor="black"
      statusBarTranslucent={false}
      backdropOpacity={0.8}
      backdropTransitionInTiming={25}
      backdropTransitionOutTiming={25}
      onBackButtonPress={() => setModalVisible(!modalVisible)}
    >
      <View>
        <View className="w-full gap p-2 bg-white items-center justify-center flex flex-col shadow-2xl shadow-slate-900 rounded-2xl">
          <Text className="text-2xl mt-5 w-full pl-5">Weight:</Text>
          <View className="flex flex-row gap-2 items-center justify-center my-10">
            <Text className="text-xl">Here we will add the wheel pickers</Text>
            <WheelPicker data={[]}/>
            <WheelPicker data={[]}/>

          </View>
          <View className="flex flex-row w-full justify-between m-2">
            <Pressable
              onPress={() => handleAddWeight()}
              className={`items-center justify-center ${
                isChanging ? "bg-gray-500" : "bg-green-700"
              } w-1/2 h-10 rounded-xl`}
              disabled={isChanging} // Disable save while actively changing values
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
      </View>
    </Modal>
  );
};

export default AddWeightEntryModal;
