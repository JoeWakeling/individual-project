import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Investment } from "../../types";
import { Ionicons } from "@expo/vector-icons";

export default function InvestmentCard({ investment }: { investment: Investment }) {
    const [expanded, setExpanded] = useState(false);

    const handlePressCard = () => {
        if (investment.subInvestments.length > 0)
            setExpanded(!expanded);
        else {
            // Open investment details screen
        }
    };

    return (
        <TouchableOpacity onPress={handlePressCard}>
            <View className="bg-white mx-2 my-1 p-2 rounded-xl shadow-md">
                <View className="flex flex-row items-center relative gap-1">
                    <View className="bg-green-700 rounded-lg p-1">
                        <Text className="text-white">{investment.type}</Text>
                    </View>
                    {/* Render chevron to indicate ability to expand card if sub-investments available */}
                    {investment.subInvestments.length > 0 &&
                        <Ionicons
                            name={expanded ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="black"
                            style={{ position: "absolute", top: 5, right: 5 }}
                        />
                    }
                </View>

                <View className="flex flex-row items-center justify-between gap-1">
                    <View className="w-63">
                        <Text className="text-lg font-bold">{investment.name}</Text>
                        <Text>{investment.instruments.join(", ")}</Text>{/* Join instrument symbols with comma and space */}
                    </View>

                    <View className="flex items-end">
                        <Text className="text-lg">£{investment.value.toLocaleString()}</Text>
                        {investment.dailyChange > 0 && <Text className="text-green-500">+{investment.dailyChange.toFixed(2)} +{investment.dailyChangePercent.toFixed(2)}%</Text>}
                        {investment.dailyChange < 0 && <Text className="text-red-500">{investment.dailyChange.toFixed(2)} {investment.dailyChangePercent.toFixed(2)}%</Text>}
                        {investment.dailyChange === 0 && <Text className="text-black">0.00 0.00%</Text>}
                    </View>
                </View>

                {/* Render divider if the card is expanded */}
                {expanded && investment.subInvestments && <View className="border-b-2 border-gray-200 mt-2 mb-1" />}

                {/* Render sub-investments if the card is expanded */}
                {expanded && investment.subInvestments.length > 0 && investment.subInvestments.map((subInvestment, index) => (
                    <View key={index} className="flex flex-row items-center justify-between pb-1 mt-1">
                        <View className="flex flex-row items-center gap-1">
                            <Image
                                source={instrumentIcons[subInvestment.instruments[0]]}
                                style={{ width: 40, height: 40 }}
                            />
                            <View className="w-63">
                                <Text className="text-lg font-bold">{subInvestment.name}</Text>
                                <Text>{subInvestment.instruments.join(", ")}</Text>
                            </View>
                        </View>


                        <View className="flex items-end">
                            <Text className="text-lg">£{subInvestment.value.toLocaleString()}</Text>
                            {subInvestment.dailyChange > 0 && <Text className="text-green-500">+{subInvestment.dailyChange.toFixed(2)} +{subInvestment.dailyChangePercent.toFixed(2)}%</Text>}
                            {subInvestment.dailyChange < 0 && <Text className="text-red-500">{subInvestment.dailyChange.toFixed(2)} {subInvestment.dailyChangePercent.toFixed(2)}%</Text>}
                            {subInvestment.dailyChange === 0 && <Text className="text-black">0.00 0.00%</Text>}
                        </View>

                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );
}

// Import images dynamically
const instrumentIcons: Record<string, any> = {
    "AAPL": require("../../assets/instrument-icons/AAPL.png"),
    "TSLA": require("../../assets/instrument-icons/TSLA.png"),
    "AMZN": require("../../assets/instrument-icons/AMZN.png"),
    "BTC": require("../../assets/instrument-icons/BTC.png"),
    "ETH": require("../../assets/instrument-icons/ETH.png"),
};
