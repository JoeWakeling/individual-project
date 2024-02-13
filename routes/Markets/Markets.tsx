import { FlatList, View } from "react-native";
import InstrumentSearchBox from "./InstrumentSearchBox";
import { useState } from "react";
import InstrumentListBox from "./InstrumentListBox";

export default function Markets() {
    const [searchResults, setSearchResults] = useState<InstrumentSearchResult[]>([]);

    const handleSearch = async (searchQuery: string) => {
        console.log(`User searching for instrument: ${searchQuery}`);

        // Fetch yahoo finance quotes matching the search query
        const quotes: Quote[] = await fetchQuotes(searchQuery);

        // Update the displayed instruments
        setSearchResults(quotes);
    }

    return (
        <View>
            <InstrumentSearchBox onSearch={handleSearch}/>
            <FlatList
                data={searchResults}
                renderItem={({ item }) => <InstrumentListBox {...item} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );

}

// Function uses Yahoo finance API to find financial instruments matching the search query
async function fetchQuotes(searchQuery: string) {
    try {
        // Fetch quotes matching the search query from API
        const response: Response = await fetch(`https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        console.log("Response:", data);

        // Return Quote objects for each quote in the response (filters out unnecessary data)
        const quotes: Quote[] = data.quotes.map((quote: Quote) => {
            return {
                symbol: quote.symbol,
                shortname: quote.shortname,
                exchDisp: quote.exchDisp,
                quoteType: quote.quoteType,
            };
        });

        console.log("Found quotes:", quotes);
        return quotes;

    } catch (error) {
        console.error('Error searching for instruments:', error);
        return [];
    }
}