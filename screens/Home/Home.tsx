import {View, Text, FlatList, TouchableOpacity} from "react-native";
import {useState} from "react";
import InvestmentCard from "./InvestmentCard";
import {Investment} from "../../types";

export default function Home() {
    const [investments, setInvestments] = useState<Investment[]>(getInvestments());
    const portfolioValue = getInvestments().reduce((acc, investment) => acc + investment.value, 0);

    return (
        <View className="h-full bg-gray-100">
            <View className="flex flex-row bg-white border-b border-gray-200 justify-between items-center px-2">
                <View className="flex py-3 flex-row">
                    <Text className="">Portfolio value: </Text>
                    <Text className="font-bold" >£{portfolioValue.toFixed(2)}</Text>
                </View>
                <TouchableOpacity className="pb-1">
                    <Text className="text-3xl font-light">+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={investments}
                renderItem={({ item }) => <InvestmentCard investment={item} />}
                keyExtractor={(item, index) => index.toString()}
                className="h-full py-1"
            />
        </View>
    );
}

// Mock data for investments
export function getInvestments(): Investment[] {
    return [
        {
            type: "ISA",
            name: "Vanguard Stocks & Shares ISA",
            instruments: ["Vanguard LifeStrategy 80% Equity Fund"],
            value: 14294.27,
            dailyChange: 55.53,
            dailyChangePercent: 0.39,
            subInvestments: [] as Investment[]
        },
        {
            type: "Easy-access savings account",
            name: "Moneybox Simple Saver",
            instruments: ["4% AER"],
            value: 8302.54,
            dailyChange: 0.83,
            dailyChangePercent: 0.01,
            subInvestments: [] as Investment[]
        },
        {
            type: "Stocks",
            name: "Trading212 Holdings",
            instruments: ["AAPL", "TSLA", "AMZN"],
            value: 4212.97,
            dailyChange: -88.35,
            dailyChangePercent: -2.05,
            subInvestments: [
                {
                    type: "Stocks",
                    name: "Amazon.com Inc.",
                    instruments: ["AMZN"],
                    value: 1809.04,
                    dailyChange: 4.87,
                    dailyChangePercent: 0.27,
                },
                {
                    type: "Stocks",
                    name: "Apple Inc.",
                    instruments: ["AAPL"],
                    value: 1951.22,
                    dailyChange: -62.01,
                    dailyChangePercent: -3.08,
                },
                {
                    type: "Stocks",
                    name: "Tesla Inc.",
                    instruments: ["TSLA"],
                    value: 452.71,
                    dailyChange: -31.21,
                    dailyChangePercent: -6.45,
                },
            ] as Investment[],
        },
        {
            type: "Crypto",
            name: "Coinbase Wallet",
            instruments: ["BTC", "ETH"],
            value: 1546.59,
            dailyChange: 73.93,
            dailyChangePercent: 5.02,
            subInvestments: [
                {
                    type: "Crypto",
                    name: "Bitcoin",
                    instruments: ["BTC"],
                    value: 1253.49,
                    dailyChange: 68.83,
                    dailyChangePercent: 5.81,
                },
                {
                    type: "Crypto",
                    name: "Ethereum",
                    instruments: ["ETH"],
                    value: 293.10,
                    dailyChange: 5.10,
                    dailyChangePercent: 1.77,
                },
            ] as Investment[],
        },
    ];
}