import {Text, View} from "react-native";

const getReadableQuoteType = (quoteType: string) => {
    switch (quoteType) {
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
            return quoteType;
    }
}


export default function InstrumentSearchResultCard(searchResult: InstrumentSearchResult) {
    return (
        <View className="bg-white mx-2 my-1 p-2 rounded">
            <View className="flex flex-row items-center relative gap-1">
                <View className="bg-green-700 rounded-lg p-1">
                    <Text className="text-white">{getReadableQuoteType(searchResult.quoteType)}</Text>
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
                    {searchResult.shortname && <Text className="text-lg font-bold">{searchResult.shortname}</Text>}
                    {!searchResult.shortname && <Text className="text-lg font-bold">{searchResult.longname}</Text>}

                    <Text>{searchResult.exchDisp}: {searchResult.symbol}</Text>
                </View>

                <View className="flex items-end">
                    <Text className="text-lg">{searchResult.regularMarketPrice}</Text>
                    {searchResult.regularMarketChange > 0 && <Text className="text-green-500">+{searchResult.regularMarketChange.toFixed(2)} +{searchResult.regularMarketChangePercent.toFixed(2)}%</Text>}
                    {searchResult.regularMarketChange < 0 && <Text className="text-red-500">{searchResult.regularMarketChange.toFixed(2)} {searchResult.regularMarketChangePercent.toFixed(2)}%</Text>}
                    {searchResult.regularMarketChange === 0 && <Text className="text-black">0.00 0.00%</Text>}
                </View>
            </View>

        </View>
    );
};