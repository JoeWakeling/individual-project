import React, {useLayoutEffect} from "react";
import {Text, View} from "react-native";
import {RouteProp, useNavigation} from "@react-navigation/native";
import HistoricalPricesChart from "./HistoricalPricesChart";
import {ScrollView} from "react-native-gesture-handler";
import MoreInfoTabs from "./MoreInfoTabs/MoreInfoTabs";
import {MarketsStackParamList} from "../../../types";

type Props = { route: RouteProp<MarketsStackParamList, "InstrumentDetails"> };

export default function InstrumentDetails({route}: Props) {
    const {instrument} = route.params;

    // Hook for changing title of this screen to the name of the instrument
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: instrument.name,
        });
    }, [navigation]);

    return (
        <ScrollView className="flex bg-white h-full p-2">
            <View className="flex bg-white p-2">
                <View className="flex-row gap-2 items-center">
                    <Text className="text-2xl font-bold">{instrument.price}</Text>
                    <View className="bg-gray-700 rounded-lg p-1">
                        <Text className="text-white">{instrument.currency}</Text>
                    </View>
                </View>
                <View className="flex justify-center">
                    {instrument.change > 0 && <Text
                        className="text-green-500 text-lg font-bold">+{instrument.change.toFixed(2)} (+{instrument.changePercent.toFixed(2)}%)</Text>}
                    {instrument.change < 0 && <Text
                        className="text-red-500 text-lg font-bold">{instrument.change.toFixed(2)} ({instrument.changePercent.toFixed(2)}%)</Text>}
                    {instrument.change === 0 && <Text className="text-black text-lg font-bold">0.00 (0.00%)</Text>}
                </View>
            </View>
            <View>
                <HistoricalPricesChart symbol={instrument.symbol}/>
            </View>

            <View className="border-b-2 border-gray-200 p-1"/>

            <View className="pt-4">
                <MoreInfoTabs instrument={instrument}/>
            </View>
        </ScrollView>

    )
}

