import {Text, View} from "react-native";
import {SummaryTabProps} from "../../../../types";

export default function SummaryTab({summary, industry}: SummaryTabProps) {
    return (
        <View className="flex gap-2 p-2 mb-4">
            <Text className="font-bold text-lg">Company profile</Text>
            <Text>{summary}</Text>
            <Text className="font-bold text-lg">Industry</Text>
            {(!industry || industry === "") && <Text>Unknown</Text>}
            {(industry && industry !== "") && <Text>{industry}</Text>}
        </View>
    )
}