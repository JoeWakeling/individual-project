interface Investment {
    type: string;
    name: string;
    instruments: string[];
    value: number;
    dailyChange: number;
    dailyChangePercent: number;
}

interface InstrumentBestMatch {
    symbol: string;
    shortname: string;
    longname: string;
    exchDisp: string;
    quoteType: string;
    industry: string;

}

interface InstrumentQuote {
    symbol: string;
    regularMarketPrice: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    currency: string;
}

interface InstrumentSearchResult {
    symbol: string;
    name: string
    exchange: string;
    type: string;
    industry: string;
    price: number;
    change: number;
    changePercent: number;
    currency: string;
}
