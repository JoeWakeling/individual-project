import {Text, View} from "react-native";
import getTailwindColourFromInvestmentType from "../../utilities/utilities";

export default function MediumRisk() {
    return (
        <View className="w-full px-6 pt-1">
            <View className="flex bg-white p-2 rounded-lg shadow mb-3">
                <View className="flex-row items-center justify-between">
                    <View className={"items-center rounded-lg p-1 " + getTailwindColourFromInvestmentType("ETF")}>
                        <Text className="text-white">ETF</Text>
                    </View>
                    <Text className="text-2xl">🇺🇸</Text>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Name:</Text>
                    <Text>Vanguard S&P 500 ETF</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Symbol:</Text>
                    <Text>VOO</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Exchange:</Text>
                    <Text>NYSE Arca</Text>
                </View>
                <View className="flex-row items-end gap-1">
                    <Text className="font-bold">Average annual returns (10yr):</Text>
                    <Text>12.66%</Text>
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
                    <Text>iShares MSCI World UCITS ETF</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Symbol:</Text>
                    <Text>SWDA</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Exchange:</Text>
                    <Text>LSE</Text>
                </View>
                <View className="flex-row items-end gap-1">
                    <Text className="font-bold">Average annual returns (10yr):</Text>
                    <Text>12.37%</Text>
                </View>
            </View>

            <View className="flex bg-white p-2 rounded-lg shadow mb-3">
                <View className="flex-row items-center justify-between">
                    <View className={"items-center rounded-lg p-1 " + getTailwindColourFromInvestmentType("Mutual fund")}>
                        <Text className="text-white">Mutual fund</Text>
                    </View>
                    <Text className="text-2xl">🇬🇧🌎</Text>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Name:</Text>
                    <Text>Vanguard LifeStrategy® 80% Equity Fund</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Symbol:</Text>
                    <Text>VGLS80A</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Provider:</Text>
                    <Text>Vanguard</Text>
                </View>
                <View className="flex-row items-end gap-1">
                    <Text className="font-bold">Average annual returns (10yr):</Text>
                    <Text>8.31%</Text>
                </View>
            </View>

            <View className="flex bg-white p-2 rounded-lg shadow mb-3">
                <View className="flex-row items-center justify-between">
                    <View className={"items-center rounded-lg p-1 " + getTailwindColourFromInvestmentType("Mutual fund")}>
                        <Text className="text-white">Mutual fund</Text>
                    </View>
                    <Text className="text-2xl">🌏</Text>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Name:</Text>
                    <Text>Fidelity Asia Pacific Opportunities Fund</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Symbol:</Text>
                    <Text>WAPOA</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Provider:</Text>
                    <Text>Fidelity</Text>
                </View>
                <View className="flex-row items-end gap-1">
                    <Text className="font-bold">Average annual returns (5yr):</Text>
                    <Text>7.26%</Text>
                </View>
            </View>
        </View>
    )
        ;
}