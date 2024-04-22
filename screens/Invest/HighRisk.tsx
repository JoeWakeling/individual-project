import {Text, View} from "react-native";
import getTailwindColourFromInvestmentType from "../../utilities/utilities";

export default function HighRisk() {
    return (
        <View className="w-full px-6 pt-1">
            <View className="flex bg-white p-2 rounded-lg shadow mb-3">
                <View className="flex-row items-center justify-between">
                    <View className={"items-center rounded-lg p-1 " + getTailwindColourFromInvestmentType("Crypto")}>
                        <Text className="text-white">Crypto</Text>
                    </View>
                    <Text className="text-2xl">🌐</Text>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Name:</Text>
                    <Text>Bitcoin</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Symbol:</Text>
                    <Text>BTC</Text>
                </View>
                <View className="flex-row items-end gap-1">
                    <Text className="font-bold">Average annual returns (10yr):</Text>
                    <Text>N/A - highly volatile</Text>
                </View>
            </View>

            <View className="flex bg-white p-2 rounded-lg shadow mb-3">
                <View className="flex-row items-center justify-between">
                    <View className={"items-center rounded-lg p-1 " + getTailwindColourFromInvestmentType("Crypto")}>
                        <Text className="text-white">Crypto</Text>
                    </View>
                    <Text className="text-2xl">🌐</Text>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Name:</Text>
                    <Text>Ethereum</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Symbol:</Text>
                    <Text>ETH</Text>
                </View>
                <View className="flex-row items-end gap-1">
                    <Text className="font-bold">Average annual returns (10yr):</Text>
                    <Text>N/A - highly volatile</Text>
                </View>
            </View>

            <View className="flex bg-white p-2 rounded-lg shadow mb-3">
                <View className="flex-row items-center justify-between">
                    <View className={"items-center rounded-lg p-1 " + getTailwindColourFromInvestmentType("ETF")}>
                        <Text className="text-white">ETF</Text>
                    </View>
                    <Text className="text-2xl">🌎</Text>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Name:</Text>
                    <Text>Vanguard Information Technology ETF</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Symbol:</Text>
                    <Text>VGT</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Exchange:</Text>
                    <Text>NYSE Arca</Text>
                </View>
                <View className="flex-row items-end gap-1">
                    <Text className="font-bold">Average annual returns (10yr):</Text>
                    <Text>20.18%</Text>
                </View>
            </View>

            <View className="flex bg-white p-2 rounded-lg shadow mb-3">
                <View className="flex-row items-center justify-between">
                    <View className={"items-center rounded-lg p-1 " + getTailwindColourFromInvestmentType("ETF")}>
                        <Text className="text-white">ETF</Text>
                    </View>
                    <Text className="text-2xl">🌎</Text>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Name:</Text>
                    <Text>iShares Semiconductor ETF</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Symbol:</Text>
                    <Text>SOXX</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Exchange:</Text>
                    <Text>NASDAQ</Text>
                </View>
                <View className="flex-row items-end gap-1">
                    <Text className="font-bold">Average annual returns (10yr):</Text>
                    <Text>24.83%</Text>
                </View>
            </View>
        </View>
    );
}