import {View, Text} from "react-native";
import PieChart from "react-native-pie-chart";

export default function Insights() {
    const widthAndHeight = 125
    const series = getData().map((data) => data.value);
    const sliceColours = getData().map((data) => data.colour);

    return (
        <View className="flex items-center bg-gray-100 h-full p-2">
            <View className="flex bg-white rounded-xl shadow-md p-4 w-full">
                <Text className="text-lg font-bold">Portfolio overview</Text>
                <View className="flex-row mt-2">
                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColours}
                        coverRadius={0.4}
                        coverFill={'#FFF'}
                    />
                    <View className="flex flex-col pl-2 justify-center gap-1">
                        {getData().map((data) => (
                            <View className="flex flex-row items-center gap-2" key={data.key}>
                                <View className="w-4 h-4 rounded-full" style={{backgroundColor: data.colour}} />
                                <Text>{data.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
}

// Data for the pie chart
function getData() {
    return [
        {
            key: 1,
            name: "Vanguard Stocks & Shares ISA",
            value: 14294,
            colour: '#004B6B', // Dark Blue
        },
        {
            key: 2,
            name: "Moneybox Cash ISA",
            value: 8302,
            colour: '#1A759F', // Deep Sky Blue
        },
        {
            key: 3,
            name: "Individual equity holdings",
            value: 4591,
            colour: '#4BA3D9', // Sky Blue
        },
        {
            key: 4,
            name: "Digital asset holdings",
            value: 2994,
            colour: '#6CC2F2', // Light Blue
        },
    ];
}

