type Investment = {
    type: string;
    name: string;
    instruments: string[];
    value: number;
    dailyChange: number;
    dailyChangePercent: number;
}

type InstrumentBestMatch = {
    symbol: string;
    shortname: string;
    longname: string;
    exchDisp: string;
    quoteType: string;
    industry: string;

}

type InstrumentQuote = {
    symbol: string;
    regularMarketPrice: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    currency: string;
}

type InstrumentSearchResult = {
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
