import {Text, View} from "react-native";
import { OverviewTabProps } from "../../../../types";
import {Fragment} from "react";

export default function OverviewTab({ instrument }: OverviewTabProps) {
    const textComponents = [];

    for (const key in instrument) {
        if (Object.prototype.hasOwnProperty.call(instrument, key)) {
            const value = instrument[key as keyof typeof instrument];
            if (value !== undefined) {
                textComponents.push(
                    <View key={key} className="flex-row justify-between p-1 border-b border-gray-300">
                        <Text className="font-bold">{camelCaseToTitleCase(key)}:</Text>
                        <Text>{value}</Text>
                    </View>
                );
            }
        }
    }

    return (
        <View className="mb-2">
            {textComponents.map((component, index) => (
                <Fragment key={index}>{component}</Fragment>
            ))}
        </View>
    );
}

function camelCaseToTitleCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z][a-z])/g, '$1')
        .replace(/^./, function(str: string){ return str.toUpperCase(); });
}