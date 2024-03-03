import {Text, TouchableOpacity, View} from "react-native";
import { StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";

export default function InstrumentSearchResultCard(instrument: Instrument) {
    const navigation = useNavigation<StackNavigationProp<MarketsStackParamList>>();

    const handleNavigation = () => {
        navigation.navigate("InstrumentDetails", {instrument: instrument});
    }

    return (
        <TouchableOpacity className="bg-white mx-2 my-1 p-2 rounded-xl shadow-md" onPress={handleNavigation}>
            <View className="flex flex-row items-center relative gap-1" >
                <View className="bg-green-700 rounded-lg p-1">
                    <Text className="text-white">{getReadableResultType(instrument.type)}</Text>
                </View>

                {instrument.industry && ( // Only show this label if industry not empty
                    <View className="bg-blue-700 rounded-lg p-1">
                        <Text className="text-white">{instrument.industry}</Text>
                    </View>
                )}

                <View className="bg-gray-700 rounded-lg p-1 absolute right-0">
                    <Text className="text-white">{instrument.currency}</Text>
                </View>
            </View>

            <View className="flex flex-row items-center justify-between gap-1">
                <View className="w-63">
                    <Text className="text-lg font-bold">{instrument.name}</Text>

                    <Text>{instrument.exchange}: {instrument.symbol}</Text>
                </View>

                <View className="flex items-end">
                    <Text className="text-lg">{instrument.price}</Text>
                    {instrument.change > 0 && <Text className="text-green-500">+{instrument.change.toFixed(2)} +{instrument.changePercent.toFixed(2)}%</Text>}
                    {instrument.change < 0 && <Text className="text-red-500">{instrument.change.toFixed(2)} {instrument.changePercent.toFixed(2)}%</Text>}
                    {instrument.change === 0 && <Text className="text-black">0.00 0.00%</Text>}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const getReadableResultType = (resultType: string) => {
    switch (resultType) {
        case "EQUITY":
            return "Stock";
        case "ETF":
            return "ETF";
        case "MUTUALFUND":
            return "Mutual Fund";
        case "FUTURE":
            return "Future";
        case "CURRENCY":
            return "Currency";
        case "CRYPTOCURRENCY":
            return "Cryptocurrency";
        default:
            return resultType;
    }
}