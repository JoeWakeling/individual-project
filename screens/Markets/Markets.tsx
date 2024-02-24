import {FlatList, Text, View} from "react-native";
import InstrumentSearchBox from "./InstrumentSearchBox";
import {useEffect, useState} from "react";
import InstrumentSearchResultCard from "./InstrumentSearchResultCard";
import {defaultBestMatches} from "./defaultBestMatches";

export default function Markets() {
    const [searchResults, setSearchResults] = useState<InstrumentSearchResult[]>();

    const handleSearch = async (searchQuery: string) => {
        console.log(`User searching for instrument: ${searchQuery}`);
        searchInstruments(searchQuery).then(setSearchResults);
    }

    // use effect to run this once
    useEffect(() => {
        searchInstruments("").then(setSearchResults);
    }, []);


    // If no results are found, don't render list, show message instead
    if (!searchResults || searchResults.length === 0) {
        return (
            <View className="flex items-center">
                <InstrumentSearchBox onSearch={handleSearch}/>
                <View className="items-center bg-white mx-2 my-2 p-2 w-32 rounded-xl shadow-md">
                    <Text>No results found</Text>
                </View>
            </View>
        );
    }

    return (
        <View>
            <InstrumentSearchBox onSearch={handleSearch}/>
            <FlatList
                data={searchResults}
                renderItem={({item}) => <InstrumentSearchResultCard {...item} />}
                keyExtractor={(item, index) => index.toString()}
                className="h-full bg-gray-100 py-1"
            />
        </View>
    );

}

// Returns financial instruments matching a search query
const searchInstruments = async (searchQuery: string) => {
    // Get best matches for search query
    let bestMatches: InstrumentBestMatch[];
    if (searchQuery === "") {
        bestMatches = defaultBestMatches; // Use default best matches if search query is empty
    } else {
        bestMatches = await fetchBestMatches(searchQuery); // Use yahoo finance API if search query is not empty
    }

    // For each search quote found, fetch price data
    const quotes: InstrumentQuote[] = await fetchQuotes(bestMatches.map((match: InstrumentBestMatch) => match.symbol));
    if (!quotes) {
        console.error('No quotes fetched for best matches, skipping all');
        return [];
    }

    // Build search results array using best matches and their corresponding quotes
    const searchResults: InstrumentSearchResult[] = [];
    for (const match of bestMatches) {
        // Find the quote for this match, skip this result if not found
        const quote: InstrumentQuote | undefined = quotes.find((quote: InstrumentQuote) => quote.symbol === match.symbol);
        if (!quote) {
            console.error(`No quote fetched for symbol ${match.symbol}, skipping...`);
            continue;
        }

        // Add the search result to the search results array
        searchResults.push({
            symbol: match.symbol,
            name: match.shortname ? match.shortname : match.longname,
            exchange: match.exchDisp,
            type: match.quoteType,
            industry: match.industry,
            price: quote.regularMarketPrice,
            change: quote.regularMarketChange,
            changePercent: quote.regularMarketChangePercent,
            currency: quote.currency,
        });
    }

    return searchResults;
}

// Queries Yahoo finance API to find financial instruments matching the search query
async function fetchBestMatches(searchQuery: string) {
    // Build URL for API request
    const url = new URL("https://query1.finance.yahoo.com/v1/finance/search");
    url.searchParams.set('q', searchQuery);

    try {
        // Fetch best matches to the search query from yahoo finance API
        const response: Response = await fetch(url.toString());
        const data = await response.json();
        return data.quotes;

    } catch (error) {
        console.error('Error searching for instruments:', error);
        return [];
    }
}

// Queries Yahoo finance API to get quotes given a list of symbols
async function fetchQuotes(symbols: string[]) {
    // Build URL for API request
    const url = new URL("https://query1.finance.yahoo.com/v6/finance/quote/");
    url.searchParams.set('symbols', symbols.join(','));

    console.log(url.toString());
    // Fetch quotes from API
    try {
        const response: Response = await fetch(url.toString());
        const data = await response.json();
        console.log(data);
        return data.quoteResponse.result;

    } catch (error) {
        console.error('Error searching for instruments:', error);
        return [];
    }
}