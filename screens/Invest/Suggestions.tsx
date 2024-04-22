import {View, Text, TouchableOpacity} from "react-native";
import { SegmentedArc } from '@shipt/segmented-arc-for-react-native';
import React, {useLayoutEffect, useState} from "react";
import LowRisk from "./LowRisk";
import MediumRisk from "./MediumRisk";
import HighRisk from "./HighRisk";
import {ScrollView} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";


export default function Suggestions(props: {riskTolerance: number, retry: any}){
    const [currentRisk, setCurrentRisk] = useState("low");

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={props.retry}
                >
                    <View className="flex-row items-center">
                        <Text className="text-blue-500 text-lg">Back</Text>
                    </View>
                </TouchableOpacity>


            ),
        });
    }, [navigation]);

    const handleRetry = () => {
        props.retry();
    }

    const [showArcRanges, setShowArcRanges] = useState(false);

    const segments = [
        {
            scale: 0.2,
            filledColor: '#78F5CA',
            emptyColor: '#F2F3F5',
            data: { label: 'Green' }
        },
        {
            scale: 0.2,
            filledColor: '#F5E478',
            emptyColor: '#F2F3F5',
            data: { label: 'Yellow' }
        },
        {
            scale: 0.2,
            filledColor: '#F5A478',
            emptyColor: '#F2F3F5',
            data: { label: 'Orange' }
        },
        {
            scale: 0.2,
            filledColor: '#FF746E',
            emptyColor: '#F2F3F5',
            data: { label: 'Red' }
        },
        {
            scale: 0.2,
            filledColor: '#FF0000',
            emptyColor: '#F2F3F5',
            data: { label: 'Dark Red' }
        }

    ];

    const _handlePress = () => {
        setShowArcRanges(!showArcRanges);
    };

    const ranges = ['20', '40', '60', '80', '100'];

    return (
        <View className="">
            <View className="bg-white p-2 pt-0 mb-1 border-b border-gray-300 shadow">
                <View className="flex-row justify-around">
                    <SegmentedArc
                        segments={segments}
                        fillValue={parseInt((props.riskTolerance*100).toFixed(0))}
                        isAnimated={true}
                        animationDelay={1000}
                        ranges={ranges}
                    >
                        {() => (
                            <View className="pt-8 items-center">
                                <Text>Risk tolerance</Text>
                                <Text className="font-bold text-2xl">{(props.riskTolerance*100).toFixed(0)}/100</Text>
                            </View>
                        )}
                    </SegmentedArc>
                </View>
                <View className="p-1 pt-4 gap-1">
                    <Text>Your risk tolerance score represents an estimate of how much risk you should take when investing</Text>
                    <Text>For example, since your score is {(props.riskTolerance*100).toFixed(0)}, you could consider investing {(100- props.riskTolerance*100).toFixed(0)}% of your portfolio in lower-risk investments, and {((props.riskTolerance)*100).toFixed(0)}% in higher-risk investments.</Text>
                    <Text>Below are some investment suggestions at varying risk levels.</Text>
                </View>
            </View>
            <ScrollView contentInset={{bottom: 250}}>
                <View className="items-center p-2">
                    <View className="flex-row bg-white p-1 rounded-lg justify-center shadow">
                        <TouchableOpacity className="bg-white p-2 rounded-lg"
                                          style={{ backgroundColor: currentRisk === "low" ? "#eee" : "#fff" }}
                                          onPress={() => setCurrentRisk("low")}>
                            <Text className="font-bold">Lower</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-white p-2 rounded-lg"
                                          style={{ backgroundColor: currentRisk === "medium" ? "#eee" : "#fff" }}
                                          onPress={() => setCurrentRisk("medium")}>
                            <Text className="font-bold">Higher</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-white p-2 rounded-lg"
                                          style={{ backgroundColor: currentRisk === "high" ? "#eee" : "#fff" }}
                                          onPress={() => setCurrentRisk("high")}>
                            <Text className="font-bold">Very High</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {currentRisk === "low" && <LowRisk/>}
                    {currentRisk === "medium" && <MediumRisk/>}
                    {currentRisk === "high" && <HighRisk/>}
                    <View className="px-3">
                        <Text className="text-gray-500">Savings account data sourced from MoneySavingExpert.com</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}