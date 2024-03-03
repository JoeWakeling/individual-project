import {Text, TouchableOpacity, View} from "react-native";
import React, { useEffect, useState } from "react";
import SummaryTab from "./SummaryTab";
import OverviewTab from "./OverviewTab";
import {MoreInfoTabsProps, SummaryData} from "../../../../types";

export default function MoreInfoTabs({ instrument }: MoreInfoTabsProps) {
    const [currentTab, setCurrentTab] = useState("overview");
    const [summary, setSummary] = useState<string>("No summary available");

    // Hook for fetching more information about the instrument when component mounts
    useEffect(() => {
        fetchSummary(instrument.symbol)
            .then((summary: string) => {
                setSummary(summary);
            })
            .catch((error) => {
                console.log("Error fetching summary data:", error);
            });
    }, [instrument.symbol]);

    return (
        <View className="flex gap-2">
            <View className="flex-row">
                <TouchableOpacity className="bg-white p-2 rounded-lg"
                                  style={{ backgroundColor: currentTab === "overview" ? "#eee" : "#fff" }}
                                  onPress={() => setCurrentTab("overview")}>
                    <Text className="font-bold">Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white p-2 rounded-lg"
                                  style={{ backgroundColor: currentTab === "summary" ? "#eee" : "#fff" }}
                                  onPress={() => setCurrentTab("summary")}>
                    <Text className="font-bold">Profile</Text>
                </TouchableOpacity>
            </View>
            <View>
                {currentTab === "overview" && <OverviewTab instrument={instrument} />}
                {currentTab === "summary" && <SummaryTab summary={summary} industry={instrument.industry} />}
            </View>
        </View>
    )
}

// Function to query Yahoo Finance API quoteSummary endpoint for more information about the instrument
async function fetchSummary(symbol: string) {
    // Fetch quotes from API providing crumb and cookie
    const url = new URL(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`);
    url.searchParams.set("modules", "assetProfile");
    url.searchParams.set("crumb", "dds1tq3Nui.");
    const summaryResponse = await fetch(url, {
        method: 'GET',
        credentials: 'omit',
        headers: {
            "Cookie": "A3=d=AQABBIWF4mUCEKn4LbFulH60VvUjBfaxRb8FEgEBAQHX42XsZc50rXYB_eMAAA&S=AQAAAlsTbxwKDLcUqg7ppLRkJsU",
        }
    });

    // Parse the json from the response
    const data: SummaryData = await summaryResponse.json();

    // Check if any json was in response
    if (data === undefined) {
        throw new Error("No json data found for symbol");
    }

    // Check if quoteSummary is in the json
    if (data.quoteSummary === undefined) {
        throw new Error("No quoteSummary found for symbol");
    }

    // If json includes an error, throw an error
    if (data.quoteSummary["error"] !== null) {
        throw new Error("" + data.quoteSummary["error"]["description"]);
    }

    // Get longBusinessSummary from the result
    const summary: string = data.quoteSummary["result"][0]["assetProfile"]["longBusinessSummary"];

    // If summary is undefined, throw an error
    if (summary === undefined) {
        throw new Error("No summary found for symbol");
    }

    // Response seems OK, return the result
    return summary;
}

