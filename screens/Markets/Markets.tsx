import { FlatList, View } from "react-native";
import InstrumentSearchBox from "./InstrumentSearchBox";
import {useEffect, useState} from "react";
import InstrumentSearchResultCard from "./InstrumentSearchResultCard";

export default function Markets() {
    const [searchResults, setSearchResults] = useState<InstrumentSearchResult[]>([]);

    // Hook to monitor If the search results are ever empty, fetch the default search results
    useEffect(() => {
        if (searchResults.length === 0) {
            getDefaultSearchResults().then(setSearchResults);
        }
    });

    const handleSearch = async (searchQuery: string) => {
        // If the search query is empty, return the default search results
        if (searchQuery === "") {
            setSearchResults([]);
            return;
        }

        console.log(`User searching for instrument: ${searchQuery}`);

        // Use yahoo finance API to find financial instruments matching the search query
        const searchQuotes = await fetchSearchQuotes(searchQuery);

        // For each search quote found, fetch price data
        const priceQuotes = await fetchPriceQuotes(searchQuotes.map((searchQuote: InstrumentSearchQuote) => searchQuote.symbol));

        // Map over each quote, fetch price data for each, and update the state with the new resulys
        setSearchResults(await Promise.all(searchQuotes.map(async (searchQuote: InstrumentSearchQuote) => {
            // Find price quote for this search quote
            const priceQuote = priceQuotes.find((priceQuote: InstrumentPriceQuote) => priceQuote.symbol === searchQuote.symbol);

            // Return a modified quote object with the stock price included
            return {
                symbol: searchQuote.symbol,
                shortname: searchQuote.shortname,
                longname: searchQuote.longname,
                exchDisp: searchQuote.exchDisp,
                quoteType: searchQuote.quoteType,
                industry: searchQuote.industry,
                regularMarketPrice: priceQuote?.regularMarketPrice || 0,
                regularMarketChange: priceQuote?.regularMarketChange || 0,
                regularMarketChangePercent: priceQuote?.regularMarketChangePercent || 0,
                currency: priceQuote?.currency || "USD",
            };
        })));

    }

    return (
        <View>
            <InstrumentSearchBox onSearch={handleSearch}/>
            <FlatList
                data={searchResults}
                renderItem={({ item }) => <InstrumentSearchResultCard {...item} />}
                keyExtractor={(item, index) => index.toString()}
                className="h-full bg-gray-300 py-1"
            />
        </View>
    );

}

// Queries Yahoo finance API to find financial instruments matching the search query
async function fetchSearchQuotes(searchQuery: string) {
    try {
        // Fetch quotes matching the search query from API
        const response: Response = await fetch(`https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        console.log("Response:", data);
        console.log("Found quotes:", data.quotes);

        return data.quotes;

    } catch (error) {
        console.error('Error searching for instruments:', error);
        return [];
    }
}

// Queries Yahoo finance API to get live price data given a symbol
async function fetchPriceQuotes(symbols: string[]) {
    const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15"

    try {
        // Get the A3 cookie
        const cookieResponse = await fetch("https://fc.yahoo.com", {
            method: 'GET',
            credentials: 'omit',
        });
        console.log(cookieResponse.headers);
        const cookie = cookieResponse.headers.get('set-cookie');
        if (!cookie) {
            console.error("Failed to get yahoo a3 cookie");
            return {"error": "Failed to get yahoo a3 cookie"};
        }

        // Get the crumb
        const crumbResponse = await fetch("https://query2.finance.yahoo.com/v1/test/getcrumb", {
            method: 'GET',
            credentials: 'omit',
            headers: {
                "Cookie": cookie,
                "User-Agent": userAgent
            }
        });
        const crumb = await crumbResponse.text();
        console.log("Crumb:", crumb);

        // Fetch quotes from API providing crumb and cookie
        const url = new URL("https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com");
        url.searchParams.set('symbols', symbols.join(','));
        url.searchParams.set('crumb', crumb);
        const quotesResponse = await fetch(url, {
            method: 'GET',
            credentials: 'omit',
            headers: {
                "Cookie": cookie,
                "User-Agent": userAgent
            }
        });
        const data = await quotesResponse.json();

        return data.quoteResponse.result;

    } catch (error) {
        console.log('Error fetching price quotes:', error);
        return [];
    }
}

// Returns a list of default search results
async function getDefaultSearchResults() {
    const searchQuotes: InstrumentSearchQuote[] = [
        {
            symbol: "AAPL",
            shortname: "Apple Inc.",
            longname: "Apple Inc.",
            exchDisp: "NASDAQ",
            quoteType: "EQUITY",
            industry: "Consumer Electronics",
        },
        {
            symbol: "GOOGL",
            shortname: "Alphabet Inc.",
            longname: "Alphabet Inc.",
            exchDisp: "NASDAQ",
            quoteType: "EQUITY",
            industry: "Internet Content & Information",
        },
        {
            symbol: "MSFT",
            shortname: "Microsoft Corporation",
            longname: "Microsoft Corporation",
            exchDisp: "NASDAQ",
            quoteType: "EQUITY",
            industry: "Software—Infrastructure",
        },
        {
            symbol: "TSLA",
            shortname: "Tesla, Inc.",
            longname: "Tesla, Inc.",
            exchDisp: "NASDAQ",
            quoteType: "EQUITY",
            industry: "Auto Manufacturers",
        },
        {
            symbol: "AMZN",
            shortname: "Amazon.com, Inc.",
            longname: "Amazon.com, Inc.",
            exchDisp: "NASDAQ",
            quoteType: "EQUITY",
            industry: "Internet Retail",
        },
        {
            symbol: "META",
            shortname: "Meta Platforms, Inc.",
            longname: "Meta Platforms, Inc.",
            exchDisp: "NASDAQ",
            quoteType: "EQUITY",
            industry: "Internet Content & Information",
        }
    ];

    // Get price quotes for each search quote
    const priceQuotes = await fetchPriceQuotes(searchQuotes.map((searchQuote: InstrumentSearchQuote) => searchQuote.symbol));

    // Map over each quote, fetch price data for each, and return the default search results
    const searchResults: InstrumentSearchResult[] = searchQuotes.map((searchQuote: InstrumentSearchQuote) => {
        // Find price quote for this search quote
        const priceQuote = priceQuotes.find((priceQuote: InstrumentPriceQuote) => priceQuote.symbol === searchQuote.symbol);

        // Return a modified quote object with the stock price included
        return {
            symbol: searchQuote.symbol,
            shortname: searchQuote.shortname,
            longname: searchQuote.longname,
            exchDisp: searchQuote.exchDisp,
            quoteType: searchQuote.quoteType,
            industry: searchQuote.industry,
            regularMarketPrice: priceQuote?.regularMarketPrice || 0,
            regularMarketChange: priceQuote?.regularMarketChange || 0,
            regularMarketChangePercent: priceQuote?.regularMarketChangePercent || 0,
            currency: priceQuote?.currency || "USD",
        };
    });

    return searchResults;
}

