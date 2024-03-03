import React, {useState} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {Investment} from "../../types";
import {Ionicons} from "@expo/vector-icons";

export default function InvestmentCard({investment}: {investment: Investment}) {
    const [expanded, setExpanded] = useState(false);

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <TouchableOpacity onPress={handleToggleExpand}>
            <View className="bg-white mx-2 my-1 p-2 rounded-xl shadow-md">
                <View className="flex flex-row items-center relative gap-1">
                    <View className="bg-green-700 rounded-lg p-1">
                        <Text className="text-white">{investment.type}</Text>
                    </View>
                    {(investment.subInvestments.length > 0) &&
                        <Ionicons
                            name={expanded ? "chevron-up" : "chevron-down"} // Use different icon names based on expanded state
                            size={20}
                            color="black"
                            style={{position: "absolute", top: 5, right: 5}} // Position the icon in the top right corner
                        />
                    }
                </View>

                <View className="flex flex-row items-center justify-between gap-1">
                    <View className="w-63">
                        <Text className="text-lg font-bold">{investment.name}</Text>
                        <Text>{investment.instruments.map((instrument) => (instrument + " "))}</Text>
                    </View>

                    <View className="flex items-end">
                        <Text className="text-lg">£{investment.value.toLocaleString()}</Text>
                        {investment.dailyChange > 0 && <Text className="text-green-500">+{investment.dailyChange.toFixed(2)} +{investment.dailyChangePercent.toFixed(2)}%</Text>}
                        {investment.dailyChange < 0 && <Text className="text-red-500">{investment.dailyChange.toFixed(2)} {investment.dailyChangePercent.toFixed(2)}%</Text>}
                        {investment.dailyChange === 0 && <Text className="text-black">0.00 0.00%</Text>}
                    </View>
                </View>

                {/* Render sub-investments if the card is expanded */}
                {expanded && investment.subInvestments && investment.subInvestments.map((subInvestment, index) => (
                    <View key={index} className="flex flex-row items-center justify-between gap-1">
                        <View className="w-63">
                            <Text className="text-lg font-bold">{subInvestment.name}</Text>
                            <Text>{subInvestment.instruments.map((instrument) => (instrument + " "))}</Text>
                        </View>

                        <View className="flex items-end">
                            <Text className="text-lg">£{subInvestment.value.toLocaleString()}</Text>
                            {/* Additional rendering for daily change if needed */}
                        </View>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );
}
