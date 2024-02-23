interface Investment {
    type: string;
    name: string;
    instruments: string[];
    value: number;
    dailyChange: number;
    dailyChangePercent: number;
}

interface InstrumentSearchQuote {
    symbol: string;
    shortname: string;
    longname: string;
    exchDisp: string;
    quoteType: string;
    industry: string;

}

interface InstrumentPriceQuote {
    symbol: string;
    regularMarketPrice: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    currency: string;
}

interface InstrumentSearchResult {
    symbol: string;
    shortname: string;
    longname: string;
    exchDisp: string;
    quoteType: string;
    industry: string;
    regularMarketPrice: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    currency: string;
}
