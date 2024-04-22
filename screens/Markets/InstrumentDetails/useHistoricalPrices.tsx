import { useEffect, useState } from "react";
import { HistoricalPricesPoint, HistoricalPricesInterval, HistoricalPricesRange } from "../../../types";

export default function useHistoricalPrices(symbol: String, defaultInterval = "5m", defaultRange = "1d") {
    // State for current historical prices provided by hook
    const [historicalPrices, setHistoricalPrices] = useState<HistoricalPricesPoint[]>(getDefaultHistoricalPrices());
    const [min, setMin] = useState<HistoricalPricesPoint>(historicalPrices[0]); // Set initial value
    const [max, setMax] = useState<HistoricalPricesPoint>(historicalPrices[0]); // Set initial value

    // Current interval and range settings for the historical prices
    const [interval, setInterval] = useState(defaultInterval);
    const [range, setRange] = useState(defaultRange);

    useEffect(() => {
        async function fetchPrices() {
            const url = new URL(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`);
            url.searchParams.set("interval", interval);
            url.searchParams.set("range", range);
            url.searchParams.set("close", "unadjusted");
            try {
                const response = await fetch(url.toString());
                const data = await response.json();
                const prices = data.chart.result[0];

                // Map the historical prices from response json format to array compatible with graphing library
                const newHistoricalPrices = prices.timestamp.map((timestamp: number, index: number) => {
                    const value = prices.indicators.quote[0].close[index];
                    // Check if the value is not null before adding it to the array
                    if (value !== null) {
                        return {
                            date: new Date(timestamp * 1000),
                            value: value
                        };
                    }
                    return null; // Skip adding this data point
                }).filter((dataPoint: any) => dataPoint !== null) as HistoricalPricesPoint[];

                // Set the historical prices
                setHistoricalPrices(newHistoricalPrices);

                // Calculate min and max points
                const filteredPrices = newHistoricalPrices.filter(point => point.value !== null);
                if (filteredPrices.length > 0) {
                    const minValue = Math.min(...filteredPrices.map(point => point.value));
                    const maxValue = Math.max(...filteredPrices.map(point => point.value));

                    // Find corresponding min and max points
                    const minPoint = newHistoricalPrices.find(point => point.value === minValue);
                    const maxPoint = newHistoricalPrices.find(point => point.value === maxValue);

                    // Set the min and max points in state
                    if (minPoint) setMin(minPoint);
                    if (maxPoint) setMax(maxPoint);
                }

                return newHistoricalPrices;
            } catch (error) {
                console.log("Error fetching historical prices", error);
                return getDefaultHistoricalPrices();
            }
        }

        fetchPrices();

        // Cleanup function to cancel any pending fetch request if component unmounts or interval/range changes
        return () => {};
    }, [symbol, interval, range]);

    const updateDataRange = (newInterval: HistoricalPricesInterval, newRange: HistoricalPricesRange) => {
        setInterval(newInterval);
        setRange(newRange);
    };

    return { historicalPrices, updateDataRange, min, max };
}

function getDefaultHistoricalPrices(): HistoricalPricesPoint[] {
    return [
        {
            date: new Date(),
            value: 1
        },
        {
            date: new Date(),
            value: 3
        }
    ];
}
