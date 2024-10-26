import { View, Text } from "react-native";
import "../global.css";

type HabitCardProps = {
    name: string;
    description: string;
    streak: number;
}

export default function HabitCard({name, description, streak}: HabitCardProps) {
    return (
        <View className="p-10">
            <Text >
                {name} | {description} |  {streak}
            </Text>
        </View>
    )
}