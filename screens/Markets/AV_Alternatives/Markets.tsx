import { FlatList, View } from "react-native";
import InstrumentSearchBox from "../InstrumentSearchBox";
import {useEffect, useState} from "react";
import InstrumentSearchResultCard from "../InstrumentSearchResultCard";

const alphaVantageApiKey: string = process.env.EXPO_PUBLIC_ALPHAVANTAGE_API_KEY as string;

export default function Markets() {
    const [searchResults, setSearchResults] = useState<InstrumentSearchResult[]>([]);

    // Hook to monitor if the search results are ever empty, if they are fetch the default search results
    useEffect(() => {
        if (searchResults.length === 0) {
            //getDefaultSearchResults().then(setSearchResults);
        }
    });

    const handleSearch = async (searchQuery: string) => {
        console.log(`User searching for instrument: ${searchQuery}`);

        // If the search query is empty, don't bother searching
        if (searchQuery === "") {
            setSearchResults([]);
            return;
        }

        // Use yahoo finance API to find financial instruments matching the search query
        const bestMatches: InstrumentBestMatch[] = await fetchBestMatches(searchQuery);

        // For each match found, use its symbol to fetch a quote
        const searchResults: InstrumentSearchResult[] = [];
        for (const match of bestMatches) {
            const quote: InstrumentQuote | {} = await fetchQuote(match["1. symbol"]);

            // Handle the case when no quote fetched for symbol
            if (!isInstrumentQuote(quote)) {
                console.error(`No quote fetched for symbol ${match["1. symbol"]}, skipping...`);
                continue; // Skip adding this match to searchResults
            }

            searchResults.push({
                symbol: match["1. symbol"],
                name: match["2. name"],
                type: match["3. type"],
                region: match["4. region"],
                marketOpen: match["5. marketOpen"],
                marketClose: match["6. marketClose"],
                timezone: match["7. timezone"],
                currency: match["8. currency"],
                matchScore: parseFloat(match["9. matchScore"]),
                open: parseFloat(quote["02. open"]),
                high: parseFloat(quote["03. high"]),
                low: parseFloat(quote["04. low"]),
                price: parseFloat(quote["05. price"]),
                volume: parseFloat(quote["06. volume"]),
                latestTradingDay: quote["07. latest trading day"],
                previousClose: parseFloat(quote["08. previous close"]),
                change: parseFloat(quote["09. change"]),
                changePercent: parseFloat(quote["10. change percent"]),
            });
        }

        setSearchResults(searchResults);
        return;
    }

    return (
        <View>
            <InstrumentSearchBox onSearch={handleSearch}/>
            <FlatList
                data={searchResults}
                renderItem={({ item }) => <InstrumentSearchResultCard {...item} />}
                keyExtractor={(item, index) => index.toString()}
                className="h-full bg-gray-100 py-1"
            />
        </View>
    );

}

// Queries Alpha Vantage API to find financial instruments matching the search query
async function fetchBestMatches(searchQuery: string) {
    try {
        // Fetch quotes from API providing crumb and cookie
        const url = new URL("https://www.alphavantage.co/query");
        url.searchParams.set('function', "SYMBOL_SEARCH");
        url.searchParams.set('keywords', searchQuery);
        url.searchParams.set('apikey', alphaVantageApiKey);

        const response: Response = await fetch(url.toString());
        const data: InstrumentBestMatchData = await response.json();

        return data.bestMatches;

    } catch (error) {
        console.log('Error fetching search results:', error);
        return [];
    }
}

// Queries Alpha Vantage API to get quote for the given symbol
async function fetchQuote(symbol: string) {
    try {
        // Fetch quotes from API providing crumb and cookie
        const url = new URL("https://www.alphavantage.co/query");
        url.searchParams.set('function', "GLOBAL_QUOTE");
        url.searchParams.set('symbol', symbol);
        url.searchParams.set('apikey', alphaVantageApiKey);

        const response: Response = await fetch(url.toString());
        const data: InstrumentQuoteData = await response.json();

        return data["Global Quote"];

    } catch (error) {
        console.log('Error fetching search results:', error);
        return {};
    }
}

// Type guard function to check if an object is of type InstrumentQuote
function isInstrumentQuote(obj: any): obj is InstrumentQuote {
    return obj && typeof obj["02. open"] === "string" &&
        typeof obj["03. high"] === "string" &&
        typeof obj["04. low"] === "string";
}
