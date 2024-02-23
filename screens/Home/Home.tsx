import {View, Text, FlatList} from "react-native";
import {useState} from "react";
import InstrumentSearchResultCard from "../Markets/InstrumentSearchResultCard";
import InvestmentCard from "./InvestmentCard";

export default function Home() {
    const [investments, setInvestments] = useState<Investment[]>(getInvestments());
    const portfolioValue = getInvestments().reduce((acc, investment) => acc + investment.value, 0);

    return (
        <View className="h-full bg-gray-100">
            <View className="flex flex-row bg-white p-4 justify-end  border-b border-gray-200">
                <Text className="">Portfolio value: </Text>
                <Text className="font-bold" >£{portfolioValue}</Text>
            </View>

            <FlatList
                data={investments}
                renderItem={({ item }) => <InvestmentCard {...item} />}
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
            instruments: ["Vanguard LS 80% Equity Fund"],
            value: 14294,
            dailyChange: 29,
            dailyChangePercent: 0.05,
        },
        {
            type: "ISA",
            name: "Moneybox Cash ISA",
            instruments: ["Moneybox easy access saver - 4.03% AER"],
            value: 8302,
            dailyChange: 16.01,
            dailyChangePercent: 0.02,
        },
        {
            type: "Stocks",
            name: "Individual equity holdings",
            instruments: ["AAPL", "TSLA", "AMZN"],
            value: 4591,
            dailyChange: 102.17,
            dailyChangePercent: 2.27,
        },
        {
            type: "Crypto",
            name: "Digital asset holdings",
            instruments: ["BTC", "ETH"],
            value: 2994,
            dailyChange: -93.43,
            dailyChangePercent: -3.03,
        },
    ];
}