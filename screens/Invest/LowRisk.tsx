import {Text, View} from "react-native";

export default function LowRisk() {
    return (
        <View className="w-full px-6 pt-1">
            <View className="flex bg-white p-2 rounded-lg shadow mb-3">
                <View className="flex-row gap-1">
                    <View className="bg-green-700 items-center rounded-lg p-1 mb-1">
                        <Text className="text-white">Easy-access savings account</Text>
                    </View>
                    <View className="bg-gray-600 items-center rounded-lg p-1 mb-1">
                        <Text className="text-white">Online</Text>
                    </View>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Provider:</Text>
                    <Text>Paragon Bank</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">AER:</Text>
                    <Text>5.16%</Text>
                    <Text className="text-xs text-gray-600">(max two withdrawals a year or rate drops to 1.5%)</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Interest paid:</Text>
                    <Text>Monthly or at maturity</Text>
                </View>
                <View className="flex-row items-end gap-1">
                    <Text className="font-bold">Deposit limits:</Text>
                    <Text>£1,000 - £500,000</Text>
                </View>
            </View>

            <View className="flex bg-white p-2 rounded-lg shadow mb-3">
                <View className="flex-row gap-1">
                    <View className="bg-green-700 items-center rounded-lg p-1 mb-1">
                        <Text className="text-white">Easy-access savings account</Text>
                    </View>
                    <View className="bg-gray-600 items-center rounded-lg p-1 mb-1">
                        <Text className="text-white">Online</Text>
                    </View>
                    <View className="bg-gray-600 items-center rounded-lg p-1 mb-1">
                        <Text className="text-white">App</Text>
                    </View>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Provider:</Text>
                    <Text>Beehive Money</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">AER:</Text>
                    <Text>5.12%</Text>
                    <Text className="text-xs text-gray-600">(includes a 2.47% bonus until 31 Mar 25)</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Interest paid:</Text>
                    <Text>Annually</Text>
                </View>
                <View className="flex-row items-end gap-1">
                    <Text className="font-bold">Deposit limits:</Text>
                    <Text>£1,000 - £85,000</Text>
                </View>
            </View>

            <View className="flex bg-white p-2 rounded-lg shadow mb-3">
                <View className="flex-row gap-1">
                    <View className="bg-blue-700 items-center rounded-lg p-1 mb-1">
                        <Text className="text-white">Fixed-term savings account</Text>
                    </View>
                    <View className="bg-gray-600 items-center rounded-lg p-1 mb-1">
                        <Text className="text-white">Online</Text>
                    </View>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Provider:</Text>
                    <Text>SmartSave</Text>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Fix length:</Text>
                    <Text>1 year</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">AER:</Text>
                    <Text>5.26%</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Interest paid:</Text>
                    <Text>At maturity</Text>
                </View>
                <View className="flex-row items-end gap-1">
                    <Text className="font-bold">Deposit limits:</Text>
                    <Text>£1,000 - £85,000</Text>
                </View>
            </View>

            <View className="flex bg-white p-2 rounded-lg shadow mb-3">
                <View className="flex-row gap-1">
                    <View className="bg-blue-700 items-center rounded-lg p-1 mb-1">
                        <Text className="text-white">Fixed-term savings account</Text>
                    </View>
                    <View className="bg-gray-600 items-center rounded-lg p-1 mb-1">
                        <Text className="text-white">App</Text>
                    </View>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Provider:</Text>
                    <Text>Atom Bank</Text>
                </View>
                <View className="flex-row gap-1 mb-1">
                    <Text className="font-bold">Fix length:</Text>
                    <Text>1 year</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">AER:</Text>
                    <Text>5.25%</Text>
                </View>
                <View className="flex-row items-end gap-1 mb-1">
                    <Text className="font-bold">Interest paid:</Text>
                    <Text>Monthly or at maturity</Text>
                </View>
                <View className="flex-row items-end gap-1">
                    <Text className="font-bold">Deposit limits:</Text>
                    <Text>£50 - £100,000</Text>
                </View>
            </View>
        </View>
    );
}