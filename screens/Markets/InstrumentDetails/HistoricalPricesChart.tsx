import {Text, TouchableOpacity, View} from "react-native";
import {LineGraph} from "react-native-graph";
import { Dimensions } from 'react-native';
import React, {useState} from "react";
import useHistoricalPrices from "./useHistoricalPrices";
import {
    HistoricalPricesChartProps,
    HistoricalPricesInterval,
    HistoricalPricesPoint,
    HistoricalPricesRange
} from "../../../types";

export default function HistoricalPricesChart({symbol}: HistoricalPricesChartProps) {
    // Initialise hook for historical prices of this symbol
    const { historicalPrices, updateDataRange, min, max} = useHistoricalPrices(symbol);

    // State for the current range of the historical prices
    const [currentRange, setCurrentRange] = useState("1d"); // Initialize current range state

    // Handler for buttons that change the range of the historical prices
    const handleDataRangeChange = (interval: HistoricalPricesInterval, range: HistoricalPricesRange) => {
        updateDataRange(interval, range);
        setCurrentRange(range);
    };

    const screenWidth = Dimensions.get('window').width;

    return (
        <View className="flex bg-white">
            <View style={{height: 200}}>
                <LineGraph
                    points={historicalPrices}
                    color="#4484B2"
                    animated={true}
                    enablePanGesture={true}
                    height={200}
                    horizontalPadding={20}
                    TopAxisLabel={() => <AxisLabel date={max.date} value={max.value} highestDate={historicalPrices[historicalPrices.length - 1].date} lowestDate={historicalPrices[0].date} screenWidth={screenWidth}/>}
                    BottomAxisLabel={() => <AxisLabel date={min.date} value={min.value} highestDate={historicalPrices[historicalPrices.length - 1].date} lowestDate={historicalPrices[0].date} screenWidth={screenWidth}/>}
                />
            </View>
            <View className="flex flex-row justify-center">
                <TouchableOpacity className="bg-white p-2 rounded-lg m-2"
                                  style={{ backgroundColor: currentRange === "1d" ? "#eee" : "#fff" }}
                                  onPress={() => handleDataRangeChange("5m", "1d")}>
                    <Text className="font-bold">1D</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white p-2 rounded-lg m-2"
                                  style={{ backgroundColor: currentRange === "5d" ? "#eee" : "#fff" }} // Check if current range is 5m
                                  onPress={() => handleDataRangeChange("15m", "5d")}>
                    <Text className="font-bold">5D</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white p-2 rounded-lg m-2"
                                  style={{ backgroundColor: currentRange === "1mo" ? "#eee" : "#fff" }} // Check if current range is 5m
                                  onPress={() => handleDataRangeChange("1d", "1mo")}>
                    <Text className="font-bold">1M</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white p-2 rounded-lg m-2"
                                  style={{ backgroundColor: currentRange === "1y" ? "#eee" : "#fff" }} // Check if current range is 5m
                                  onPress={() => handleDataRangeChange("1wk", "1y")}>
                    <Text className="font-bold">1Y</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white p-2 rounded-lg m-2"
                                  style={{ backgroundColor: currentRange === "max" ? "#eee" : "#fff" }} // Check if current range is 5m
                                  onPress={() => handleDataRangeChange("1mo", "max")}>
                    <Text className="font-bold">MAX</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function AxisLabel({date, value, highestDate, lowestDate, screenWidth}: { date: Date, value: number, highestDate: Date, lowestDate: Date, screenWidth: number }) {
    // Calculate the position of the label on the x-axis
    const totalDuration = highestDate.getTime() - lowestDate.getTime();
    const currentDateDistance = date.getTime() - lowestDate.getTime();
    const ratio = currentDateDistance / totalDuration;
    const position = ratio * (screenWidth - 60);

    if (value !== null && !isNaN(value) && !isNaN(position)) {
        return (
            <View style={{position: 'absolute', left: position, bottom: 0}}>
                <Text className="font-bold text-gray-800">{value.toFixed(2)}</Text>
            </View>
        )
    } else if (!isNaN(value) && !isNaN(position)){
        return (
            <View style={{position: 'absolute', left: position, bottom: 0}}>
                <Text className="font-bold text-gray-800">0</Text>
            </View>
        )
    }
}