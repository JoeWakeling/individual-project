import {Text, View} from "react-native";

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


export default function InstrumentSearchResultCard(searchResult: InstrumentSearchResult) {
    return (
        <View className="bg-white mx-2 my-1 p-2 rounded-xl shadow-md">
            <View className="flex flex-row items-center relative gap-1">
                <View className="bg-green-700 rounded-lg p-1">
                    <Text className="text-white">{getReadableResultType(searchResult.type)}</Text>
                </View>

                {searchResult.industry && ( // Only show this label if industry not empty
                    <View className="bg-blue-700 rounded-lg p-1">
                        <Text className="text-white">{searchResult.industry}</Text>
                    </View>
                )}

                <View className="bg-gray-700 rounded-lg p-1 absolute right-0">
                    <Text className="text-white">{searchResult.currency}</Text>
                </View>
            </View>

            <View className="flex flex-row items-center justify-between gap-1">
                <View className="w-63">
                    <Text className="text-lg font-bold">{searchResult.name}</Text>

                    <Text>{searchResult.exchange}: {searchResult.symbol}</Text>
                </View>

                <View className="flex items-end">
                    <Text className="text-lg">{searchResult.price}</Text>
                    {searchResult.change > 0 && <Text className="text-green-500">+{searchResult.change.toFixed(2)} +{searchResult.changePercent.toFixed(2)}%</Text>}
                    {searchResult.change < 0 && <Text className="text-red-500">{searchResult.change.toFixed(2)} {searchResult.changePercent.toFixed(2)}%</Text>}
                    {searchResult.change === 0 && <Text className="text-black">0.00 0.00%</Text>}
                </View>
            </View>

        </View>
    );
};