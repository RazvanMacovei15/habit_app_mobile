import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { useAuth } from "../../app/context/AuthContext";
import { BodyStatsForm } from "@/components/types/forms/BodyStatsForm";
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
  return (
    <>
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
        <View className="w-full gap p-2 bg-white items-center justify-evenly flex flex-col shadow-2xl shadow-slate-900 rounded-2xl">
          <AddBodyStat
            title={"Weight"}
            value={bodyStatsForm.weight}
            handleChangeText={(e) =>
              setHabitForm({ ...bodyStatsForm, weight: e })
            }
            placeholder={"kgs..."}
          />
          <AddBodyStat
            title={"Waist"}
            value={bodyStatsForm.waist}
            handleChangeText={(e) =>
              setHabitForm({ ...bodyStatsForm, waist: e })
            }
            placeholder={"cm..."}
          />
          <AddBodyStat
            title={"Abdomen"}
            value={bodyStatsForm.abdomen}
            handleChangeText={(e) =>
              setHabitForm({ ...bodyStatsForm, abdomen: e })
            }
            placeholder={"cm..."}
          />
          <AddBodyStat
            title={"Chest"}
            value={bodyStatsForm.chest}
            handleChangeText={(e) =>
              setHabitForm({ ...bodyStatsForm, chest: e })
            }
            placeholder={"cm..."}
          />
          <AddBodyStat
            title={"Bicep"}
            value={bodyStatsForm.bicep}
            handleChangeText={(e) =>
              setHabitForm({ ...bodyStatsForm, bicep: e })
            }
            placeholder={"cm..."}
          />
          <AddBodyStat
            title={"Quad"}
            value={bodyStatsForm.quad}
            handleChangeText={(e) =>
              setHabitForm({ ...bodyStatsForm, quad: e })
            }
            placeholder={"cm..."}
          />
          <AddBodyStat
            title={"Neck"}
            value={bodyStatsForm.neck}
            handleChangeText={(e) =>
              setHabitForm({ ...bodyStatsForm, neck: e })
            }
            placeholder={"cm..."}
          />
          <View className="flex flex-row w-full justify-between m-2">
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
