import {View, Text, TouchableOpacity, Dimensions} from "react-native";
import PieChart from "react-native-pie-chart";
import {getInvestments} from "../Home/Home";
import {Investment} from "../../types";
import {getHexColourFromInvestmentType} from "../../utilities/utilities";
import {LineGraph} from "react-native-graph";
import React from "react";

type HistoricalPortfolioValue = {
    date: Date;
    value: number;
};

export default function Insights() {
    const investments: Investment[] = getInvestments();

    // Pie chart setup
    const widthAndHeight = 125
    const series = investments.map((investment: Investment) => investment.value);
    const sliceColours = investments.map((investment: Investment) => getHexColourFromInvestmentType(investment.type));

    // Performance chart setup
    const portfolioValue = getInvestments().reduce((acc, investment) => acc + investment.value, 0);
    const historicalPrices = generatePlaceholderData(portfolioValue, 50);
    const minValue = Math.min(...historicalPrices.map(point => point.value));
    const maxValue = Math.max(...historicalPrices.map(point => point.value));

    // Find corresponding min and max points
    const min = historicalPrices.find(point => point.value === minValue);
    const max = historicalPrices.find(point => point.value === maxValue);
    const screenWidth = Dimensions.get('window').width;

    return (
        <View className="flex items-center bg-gray-100 h-full p-4">
            <View className="flex bg-white rounded-xl shadow-md p-4 w-full mb-4">
                <Text className="text-lg font-bold">Portfolio allocation</Text>
                <View className="flex-row mt-2">
                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColours}
                        coverRadius={0.4}
                        coverFill={'#FFF'}
                    />
                    <View className="flex flex-col pl-2 justify-center gap-1">
                        {investments.map((investment, index) => (
                            <View className="flex flex-row items-center gap-2" key={index}>
                                <View className="w-4 h-4 rounded-full" style={{backgroundColor: getHexColourFromInvestmentType(investment.type)}} />
                                <Text>{investment.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            <View className="flex bg-white rounded-xl shadow-md p-4 w-full">
                <Text className="text-lg font-bold">Portfolio performance</Text>
                <View className="flex py-3 flex-row">
                    <Text className="">Current value: </Text>
                    <Text className="font-bold" >£{portfolioValue.toFixed(2)}</Text>
                </View>
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
                <View className="flex flex-row justify-center">
                    <TouchableOpacity className="bg-white p-2 rounded-lg m-2"
                                      style={{ backgroundColor: "#fff"}}>
                        <Text className="font-bold">1D</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white p-2 rounded-lg m-2"
                                      style={{ backgroundColor: "#fff" }}>
                        <Text className="font-bold">5D</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white p-2 rounded-lg m-2"
                                      style={{ backgroundColor: "#fff" }}>
                        <Text className="font-bold">1M</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white p-2 rounded-lg m-2"
                                      style={{ backgroundColor:"#eee" }}>
                        <Text className="font-bold">1Y</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white p-2 rounded-lg m-2"
                                      style={{ backgroundColor: "#fff" }}>
                        <Text className="font-bold">MAX</Text>
                    </TouchableOpacity>
                </View>
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

function generatePlaceholderData(currentValue: number, numberOfPoints: number): HistoricalPortfolioValue[] {
    const now = new Date(); // Current date
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

    // Generate placeholder data points
    const placeholderData: HistoricalPortfolioValue[] = [];
    let previousValue = currentValue;
    for (let i = 0; i < numberOfPoints; i++) {
        // Randomize value change per point and direction
        const variationFactor = Math.random() * 0.2 + 0.9; // Random factor between 0.9 and 1.1
        const valueChangePerPoint = (currentValue / (numberOfPoints - 1)) * variationFactor; // Linear change with variation
        const direction = Math.random() < 0.5 ? -1 : 1; // Random direction: -1 (decrease) or 1 (increase)
        const date = new Date(now.getTime() - (numberOfPoints - 1 - i) * oneDay); // Decrease timestamp for each day
        const value = previousValue + direction * valueChangePerPoint; // Add direction to value
        placeholderData.push({ date, value });
        previousValue = value;
    }

    return placeholderData;
}



