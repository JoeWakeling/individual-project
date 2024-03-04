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
                    <Text className="font-bold" >£{portfolioValue}</Text>
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
function getInvestments() {
    return [
        {
            type: "ISA",
            name: "Vanguard Stocks & Shares ISA",
            instruments: ["Vanguard LifeStrategy 80% Equity Fund"],
            value: 14294.27,
            dailyChange: 29,
            dailyChangePercent: 0.05,
            subInvestments: []
        },
        {
            type: "Easy-access savings account",
            name: "Moneybox Simple Saver",
            instruments: ["4% AER"],
            value: 8302.54,
            dailyChange: 16.01,
            dailyChangePercent: 0.02,
            subInvestments: []
        },
        {
            type: "Stocks",
            name: "Individual equity holdings",
            instruments: ["AAPL", "TSLA", "AMZN"],
            value: 4591.19,
            dailyChange: 102.17,
            dailyChangePercent: 2.27,
            subInvestments: [
                {
                    type: "Stocks",
                    name: "Apple Inc.",
                    instruments: ["AAPL"],
                    value: 1991.19,
                    dailyChange: 12.17,
                    dailyChangePercent: 0.27,
                },
                {
                    type: "Stocks",
                    name: "Tesla Inc.",
                    instruments: ["TSLA"],
                    value: 1991.19,
                    dailyChange: 12.17,
                    dailyChangePercent: 0.27,
                },
                {
                    type: "Stocks",
                    name: "Amazon.com Inc.",
                    instruments: ["AMZN"],
                    value: 1991.19,
                    dailyChange: 12.17,
                    dailyChangePercent: 0.27,
                },
            ],
        },
        {
            type: "Crypto",
            name: "Digital asset holdings",
            instruments: ["BTC", "ETH"],
            value: 2994.93,
            dailyChange: -93.43,
            dailyChangePercent: -3.03,
            subInvestments: [
                {
                    type: "Crypto",
                    name: "Bitcoin",
                    instruments: ["BTC"],
                    value: 1994.93,
                    dailyChange: -93.43,
                    dailyChangePercent: -3.03,
                },
                {
                    type: "Crypto",
                    name: "Ethereum",
                    instruments: ["ETH"],
                    value: 1000,
                    dailyChange: 0,
                    dailyChangePercent: 0,
                },
            ],
        },
    ];
}