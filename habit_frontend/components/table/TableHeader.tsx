// TableHeader.js
import { View, Text } from "react-native";
import "../../global.css";

interface TableHeaderProps {
    headers: string[];
}

export default function TableHeader({ headers }: TableHeaderProps) {
    return (
        <View className="flex-row p-1 border-2 border-red-800 justify-around w-full bg-gray-700">
            {headers.map((header, index) => {
                // Set the width class conditionally based on the header name
                const widthClass = header === 'id' ? 'w-1/6' : 'w-1/4';

                return (
                    <Text
                        key={index}
                        className={`text-xs p-2 text-white text-center ${widthClass}`} // Use template literal for dynamic class
                    >
                        {header}
                    </Text>
                );
            })}
        </View>
    );
}
