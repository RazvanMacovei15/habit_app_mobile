import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import AddHabitFormField from "../habitScreenComponents/formFields/AddHabitFormField";
import CustomDropdown from "../CustomDropdown";
import AddDescriptionFormField from "../habitScreenComponents/formFields/AddDescriptionFormField";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { HabitForm } from "@/components/types/forms/HabitForm";

interface AddHabitModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  habitForm: HabitForm;
  setHabitForm: (value: any) => void;
  handleUpdate: () => void;
}

const EditHabitModal = ({
  modalVisible,
  setModalVisible,
  habitForm,
  setHabitForm,
  handleUpdate,
}: AddHabitModalProps) => {
  const [error, setError] = useState(null);
  const [types, setTypes] = useState<string[]>([]);
  const [occurrences, setOccurrences] = useState<string[]>([]);

  const { authState } = useAuth();
  const token = authState?.token;

  const fetchOccurences = async (endpoint: string, token: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOccurrences(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
    }
  };

  const fetchTypes = async (endpoint: string, token: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTypes(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
    }
  };

  useEffect(() => {
    if (token) {
      fetchTypes("http://maco-coding.go.ro:8020/api/enums/types", token);
      fetchOccurences(
        "http://maco-coding.go.ro:8020/api/enums/occurrences",
        token
      );
    }
  }, []);
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
          <AddHabitFormField
            title={"NAME"}
            value={habitForm.habitName}
            handleChangeText={(e) => {
              setHabitForm({
                ...habitForm,
                habitName: e,
              });
            }}
            placeholder={"Name of the habit"}
          />
          <View className="flex flex-row">
            <CustomDropdown
              data={types}
              title="type:"
              defaultValue={habitForm.type}
              onSelectValue={(e: string) =>
                setHabitForm({
                  ...habitForm,
                  type: e,
                })
              }
            />
            <CustomDropdown
              data={occurrences}
              title="occurrence:"
              defaultValue={habitForm.occurrence}
              onSelectValue={(e: string) => {
                setHabitForm({
                  ...habitForm,
                  occurrence: e,
                });
              }}
            />
          </View>
          <AddDescriptionFormField
            title={"Description"}
            value={habitForm.description}
            handleChangeText={(e) => {
              setHabitForm({
                ...habitForm,
                description: e,
              });
            }}
            placeholder={"Write a short description"}
          />
          <View className="flex flex-row w-full justify-between m-5">
            <Pressable
              onPress={() => handleUpdate()}
              className="items-center justify-center bg-green-700 w-1/2 h-10 rounded-xl"
            >
              <Text className="text-md text-white">UPDATE</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              className="items-center justify-center bg-red-700 w-1/2 h-10 rounded-xl"
            >
              <Text className="text-md text-white ">CANCEL</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EditHabitModal;
