import {FlatList, Text, View} from "react-native";
import {useEffect, useState} from "react";
import InstrumentSearchBox from "./InstrumentSearchBox";
import InstrumentSearchResultCard from "./InstrumentSearchResultCard";
import {defaultBestMatches} from "./defaultBestMatches";
import {
    Instrument,
    InstrumentBestMatch,
    InstrumentBestMatchData,
    InstrumentQuote,
    InstrumentQuoteData
} from "../../types";

export default function Markets() {
    const [searchResults, setSearchResults] = useState<Instrument[]>();

    const handleSearch = async (searchQuery: string) => {
        console.log(`User searching for instrument: ${searchQuery}`);
        searchInstruments(searchQuery).then(setSearchResults);
    }

    // use effect to run this once
    useEffect(() => {
        searchInstruments("").then(setSearchResults);
    }, []);

    return (
        <View>
            <InstrumentSearchBox onSearch={handleSearch}/>
            {(searchResults && searchResults.length !== 0) &&
                <FlatList
                    data={searchResults}
                    renderItem={({item}) => <InstrumentSearchResultCard {...item} />}
                    keyExtractor={(_item, index) => index.toString()}
                    className="h-full bg-gray-100 py-1"
                />
            }
            {(!searchResults || searchResults.length === 0) &&
                <View className="w-full items-center">
                    <View className="bg-white mx-2 my-2 p-2 w-32 rounded-xl shadow-md">
                        <Text>No results found</Text>
                    </View>
                </View>
            }
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
        console.error("No quotes fetched for best matches, skipping all");
        return [];
    }

    // Build search results array using best matches and their corresponding quotes
    const searchResults: Instrument[] = [];
    for (const match of bestMatches) {
        // Find the quote for this match, skip this result if not found
        const quote: InstrumentQuote | undefined = quotes.find((quote: InstrumentQuote) => quote.symbol === match.symbol);
        if (!quote) {
            console.error(`No quote fetched for symbol ${match.symbol}, skipping...`);
            continue;
        }

        // Add the search result to the search results array
        searchResults.push({
            name: match.shortname ? match.shortname : match.longname,
            symbol: match.symbol,
            exchange: match.exchDisp,
            type: match.quoteType,
            industry: match.industry,
            price: quote.regularMarketPrice,
            change: quote.regularMarketChange,
            changePercent: quote.regularMarketChangePercent,
            currency: quote.currency,
            marketState: quote.marketState, 
            regularMarketDayRange: quote.regularMarketDayRange, 
            regularMarketDayHigh: quote.regularMarketDayHigh, 
            regularMarketDayLow: quote.regularMarketDayLow, 
            regularMarketOpen: quote.regularMarketOpen, 
            regularMarketPreviousClose: quote.regularMarketPreviousClose, 
            regularMarketVolume: quote.regularMarketVolume, 
            fiftyTwoWeekRange: quote.fiftyTwoWeekRange, 
            fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh, 
            fiftyTwoWeekLow: quote.fiftyTwoWeekLow, 
            fiftyTwoWeekHighChange: quote.fiftyTwoWeekHighChange, 
            fiftyTwoWeekHighChangePercent: quote.fiftyTwoWeekHighChangePercent, 
            fiftyTwoWeekLowChange: quote.fiftyTwoWeekLowChange, 
            fiftyTwoWeekLowChangePercent: quote.fiftyTwoWeekLowChangePercent, 
            bid: quote.bid, 
            bidSize: quote.bidSize, 
            ask: quote.ask, 
            askSize: quote.askSize, 
            averageDailyVolume10Day: quote.averageDailyVolume10Day, 
            averageDailyVolume3Month: quote.averageDailyVolume3Month, 
            bookValue: quote.bookValue, 
            earningsTimestamp: quote.earningsTimestamp, 
            earningsTimestampStart: quote.earningsTimestampStart, 
            earningsTimestampEnd: quote.earningsTimestampEnd, 
            epsCurrentYear: quote.epsCurrentYear, 
            epsForward: quote.epsForward, 
            epsTrailingTwelveMonths: quote.epsTrailingTwelveMonths, 
            forwardPE: quote.forwardPE, 
            trailingPE: quote.trailingPE, 
            priceEpsCurrentYear: quote.priceEpsCurrentYear, 
            priceToBook: quote.priceToBook, 
            marketCap: quote.marketCap, 
            sharesOutstanding: quote.sharesOutstanding, 
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
        const data: InstrumentBestMatchData = await response.json();
        return data.quotes;

    } catch (error) {
        console.error("Error searching for instruments:", error);
        return [];
    }
}


// Queries Yahoo finance API to get quotes given a list of symbols
async function fetchQuotes(symbols: string[]) {
    // Build URL for API request
    const url = new URL("https://query1.finance.yahoo.com/v6/finance/quote/");
    url.searchParams.set("symbols", symbols.join(','));

    // Fetch quotes from API
    try {
        const response: Response = await fetch(url.toString());
        const data: InstrumentQuoteData = await response.json();
        return data.quoteResponse.result;

    } catch (error) {
        console.error("Error fetching quotes for searched instruments:", error);
        return [];
    }
}