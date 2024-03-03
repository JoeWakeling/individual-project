import { useEffect, useState } from "react";

function useHistoricalPrices(symbol: String, defaultInterval = "15m", defaultRange = "5d") {
    const [historicalPrices, setHistoricalPrices] = useState([]);
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

                // Set the historical prices
                setHistoricalPrices(
                    prices.timestamp.map((timestamp: number, index: number) => {
                        const value = prices.indicators.quote[0].close[index];
                        // Check if the value is not null before adding it to the array
                        if (value !== null) {
                            return {
                                date: new Date(timestamp * 1000),
                                value: value
                            };
                        } else {
                            return null; // Skip adding this data point
                        }
                    }).filter((dataPoint: any) => dataPoint !== null) // Filter out null values
                );

            } catch (error) {
                console.log("Error fetching historical prices", error);
                setHistoricalPrices([]);
            }
        }

        fetchPrices();

        // Cleanup function to cancel any pending fetch request if component unmounts or interval/range changes
        return () => setHistoricalPrices([]);
    }, [symbol, interval, range]);

    const updateDataRange = (newInterval: HistoricalPricesInterval, newRange: HistoricalPricesRange) => {
        setInterval(newInterval);
        setRange(newRange);
    };

    return { historicalPrices, updateDataRange };
}

export default useHistoricalPrices;
