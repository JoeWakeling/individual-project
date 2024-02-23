import {Text, View} from "react-native";

export default function InvestmentCard(investment: Investment) {
    return (
        <View className="bg-white mx-2 my-1 p-2 rounded-xl shadow-md">
            <View className="flex flex-row items-center relative gap-1">
                <View className="bg-green-700 rounded-lg p-1">
                    <Text className="text-white">{investment.type}</Text>
                </View>
            </View>

            <View className="flex flex-row items-center justify-between gap-1">
                <View className="w-63">
                    <Text className="text-lg font-bold">{investment.name}</Text>
                    <Text>{investment.instruments.map((instrument) => (instrument + " "))}</Text>
                </View>

                <View className="flex items-end">
                    <Text className="text-lg">{investment.value}</Text>
                    {investment.dailyChange > 0 && <Text className="text-green-500">+{investment.dailyChange.toFixed(2)} +{investment.dailyChangePercent.toFixed(2)}%</Text>}
                    {investment.dailyChange < 0 && <Text className="text-red-500">{investment.dailyChange.toFixed(2)} {investment.dailyChangePercent.toFixed(2)}%</Text>}
                    {investment.dailyChange === 0 && <Text className="text-black">0.00 0.00%</Text>}
                </View>
            </View>
        </View>
    );
}