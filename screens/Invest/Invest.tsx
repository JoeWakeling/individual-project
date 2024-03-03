import {View, Text, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import LowRisk from "./LowRisk";

export default function Invest() {
    const [currentRisk, setCurrentRisk] = useState("low");

    return (
        <View className="">
            <View className="bg-white p-2 mb-1 border-b border-gray-300 shadow">
                <Text>• This screen provides investment suggestions.</Text>
                <Text>• Adjust the risk level using the buttons below.</Text>
                <Text>• Data sourced from MoneySavingExpert.com.</Text>
            </View>

            <View className="w-full items-center p-2">
                <View className="flex-row bg-white p-1 rounded-lg justify-center shadow">
                    <TouchableOpacity className="bg-white p-2 rounded-lg"
                                      style={{ backgroundColor: currentRisk === "low" ? "#eee" : "#fff" }}
                                      onPress={() => setCurrentRisk("low")}>
                        <Text className="font-bold">Low</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white p-2 rounded-lg"
                                      style={{ backgroundColor: currentRisk === "medium" ? "#eee" : "#fff" }}
                                      onPress={() => setCurrentRisk("medium")}>
                        <Text className="font-bold">Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white p-2 rounded-lg"
                                      style={{ backgroundColor: currentRisk === "high" ? "#eee" : "#fff" }}
                                      onPress={() => setCurrentRisk("high")}>
                        <Text className="font-bold">High</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {currentRisk === "low" && <LowRisk/>}
            </View>
        </View>
    );
}