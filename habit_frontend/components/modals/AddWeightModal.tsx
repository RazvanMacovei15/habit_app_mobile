import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { WeightForm } from "../types/forms/WeightForm";
import Modal from "react-native-modal";
import AddBodyStat from "../habitScreenComponents/formFields/AddBodyStat";
import WheelPicker, {
  withVirtualized,
} from "@quidone/react-native-wheel-picker";
import { set } from "date-fns";

interface AddWeightModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  weightForm: WeightForm;
  setWeightForm: (value: any) => void;
  handleCreateWeight: () => void;
  lastWeight: number;
}

const data = [...Array(200).keys()].map((index1) => ({
  value: index1,
  label: index1.toString(),
}));
const data2 = [...Array(10).keys()].map((index) => ({
  value: index,
  label: index.toString(),
}));

const VirtualizedWheelPicker = withVirtualized(WheelPicker);

const AddWeightModal = ({
  modalVisible,
  setModalVisible,
  weightForm,
  setWeightForm,
  handleCreateWeight,
  lastWeight,
}: AddWeightModalProps) => {
  // Safely initialize integerPart and decimalPart with fallback to 0 if lastWeight is invalid
  const safeLastWeight = !isNaN(lastWeight) && lastWeight >= 0 ? lastWeight : 0;
  const integerPart = Math.floor(safeLastWeight);
  const decimalPart = Math.round((safeLastWeight - integerPart) * 10).toFixed(
    2
  );

  console.log("Integer Part:", integerPart, "Decimal Part:", decimalPart);

  const [value, setValue] = useState(integerPart);
  const [decimalValue, setDecimalValue] = useState(decimalPart);

  const [isChanging, setIsChanging] = useState(false); // Track whether a value is actively being changed

  // Function to update weightForm with combined weight
  const updateWeightForm = (newValue: number, newDecimalValue: number) => {
    const combinedWeight = newValue + newDecimalValue / 10;
    setWeightForm({ ...weightForm, weight: combinedWeight });
  };

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
            <VirtualizedWheelPicker
              data={data}
              value={value}
              onValueChanged={({ item: { value: newValue } }) => {
                setValue(newValue);
                updateWeightForm(newValue, decimalValue);
                setIsChanging(false); // Reset isChanging to false after value change
              }}
              //disable save on value changing
              onValueChanging={() => setIsChanging(true)}
              width={50}
              itemHeight={50}
              visibleItemCount={3}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
            />
            <Text className="text-xl">.</Text>
            <WheelPicker
              data={data2}
              value={decimalValue}
              onValueChanged={({ item: { value: newDecimalValue } }) => {
                setDecimalValue(newDecimalValue);
                updateWeightForm(value, newDecimalValue);
                setIsChanging(false); // Reset isChanging to false after value change
                console.log(weightForm);
              }}
              onValueChanging={() => setIsChanging(true)}
              width={50}
              itemHeight={50}
              visibleItemCount={3}
            />
            <Text className="text-xl">kg</Text>
          </View>

          <View className="flex flex-row w-full justify-between m-2">
            <Pressable
              onPress={() => handleCreateWeight()}
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

export default AddWeightModal;
