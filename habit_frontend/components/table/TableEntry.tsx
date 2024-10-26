// TableEntry.js
import { View, Text } from "react-native";

interface TableEntryProps {
    entry: { [key: string]: string | number | boolean };
}

export default function TableEntry({ entry }: TableEntryProps) {
    return (
        <View className="flex-row p-2 border-2 border-red-800 justify-around">
            {Object.entries(entry).map(([key, value], index) => {
                // Check if the key is 'ID' to set the width conditionally
                const widthClass = key === 'id' ? 'w-1/6' : 'w-1/4';
                
                return (
                    <Text
                        className={`text-xs p-2 text-black text-center ${widthClass}`} // Use template literal for dynamic class
                        key={index}
                    >
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}  {/* For boolean formatting */}
                    </Text>
                );
            })}
        </View>
    );
}
