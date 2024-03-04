/// <reference types="nativewind/types" />

import {SceneRendererProps} from "react-native-tab-view";

type HomeStackParamList = {
    Home: undefined;
}

type InsightsStackParamList = {
    Insights: undefined;
}

type InvestStackParamList = {
    Invest: undefined;
}

type MarketsStackParamList = {
    Markets: undefined;
    InstrumentDetails: { instrument: Instrument };
}

type MoreStackParamList = {
    Settings: undefined;
}

type HistoricalPricesChartProps  = {
    symbol: String;
}

type MoreInfoTabsProps  = {
    instrument: Instrument;
}

interface OverviewTabProps {
    instrument: Instrument;
}

interface SummaryTabProps {
    summary: string
    industry: string
}


type Investment = {
    type: string;
    name: string;
    instruments: string[];
    value: number;
    dailyChange: number;
    dailyChangePercent: number;
    subInvestments?: Investment[];
}

type InstrumentBestMatchData = {
    quotes: InstrumentBestMatch[];
}

type InstrumentBestMatch = {
    symbol: string;
    shortname: string;
    longname: string;
    exchDisp: string;
    quoteType: string;
    industry: string;

}

type InstrumentQuoteData = {
    quoteResponse: {
        result: InstrumentQuote[];
    }
}

type InstrumentQuote = {
    symbol: string;
    regularMarketPrice: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    currency: string;
    marketState: quote.marketState, // Add new variable
    regularMarketDayRange: quote.regularMarketDayRange, // Add new variable
    regularMarketDayHigh: quote.regularMarketDayHigh, // Add new variable
    regularMarketDayLow: quote.regularMarketDayLow, // Add new variable
    regularMarketOpen: quote.regularMarketOpen, // Add new variable
    regularMarketPreviousClose: quote.regularMarketPreviousClose, // Add new variable
    regularMarketVolume: quote.regularMarketVolume, // Add new variable
    fiftyTwoWeekRange: quote.fiftyTwoWeekRange, // Add new variable
    fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh, // Add new variable
    fiftyTwoWeekLow: quote.fiftyTwoWeekLow, // Add new variable
    fiftyTwoWeekHighChange: quote.fiftyTwoWeekHighChange, // Add new variable
    fiftyTwoWeekHighChangePercent: quote.fiftyTwoWeekHighChangePercent, // Add new variable
    fiftyTwoWeekLowChange: quote.fiftyTwoWeekLowChange, // Add new variable
    fiftyTwoWeekLowChangePercent: quote.fiftyTwoWeekLowChangePercent, // Add new variable
    bid: quote.bid, // Add new variable
    bidSize: quote.bidSize, // Add new variable
    ask: quote.ask, // Add new variable
    askSize: quote.askSize, // Add new variable
    averageDailyVolume10Day: quote.averageDailyVolume10Day, // Add new variable
    averageDailyVolume3Month: quote.averageDailyVolume3Month, // Add new variable
    bookValue: quote.bookValue, // Add new variable
    earningsTimestamp: quote.earningsTimestamp, // Add new variable
    earningsTimestampStart: quote.earningsTimestampStart, // Add new variable
    earningsTimestampEnd: quote.earningsTimestampEnd, // Add new variable
    epsCurrentYear: quote.epsCurrentYear, // Add new variable
    epsForward: quote.epsForward, // Add new variable
    epsTrailingTwelveMonths: quote.epsTrailingTwelveMonths, // Add new variable
    forwardPE: quote.forwardPE, // Add new variable
    trailingPE: quote.trailingPE, // Add new variable
    priceEpsCurrentYear: quote.priceEpsCurrentYear, // Add new variable
    priceToBook: quote.priceToBook, // Add new variable
    marketCap: quote.marketCap, // Add new variable
    sharesOutstanding: quote.sharesOutstanding, // Add new variable
}

type Instrument = {
    symbol: string;
    name: string;
    exchange: string;
    type: string;
    industry: string;
    price: number;
    change: number;
    changePercent: number;
    currency: string;
    marketState: string; 
    regularMarketDayRange: string; 
    regularMarketDayHigh: number; 
    regularMarketDayLow: number; 
    regularMarketOpen: number; 
    regularMarketPreviousClose: number; 
    regularMarketVolume: number; 
    fiftyTwoWeekRange: string; 
    fiftyTwoWeekHigh: number; 
    fiftyTwoWeekLow: number; 
    fiftyTwoWeekHighChange: number; 
    fiftyTwoWeekHighChangePercent: number; 
    fiftyTwoWeekLowChange: number; 
    fiftyTwoWeekLowChangePercent: number; 
    bid: number; 
    bidSize: number; 
    ask: number; 
    askSize: number; 
    averageDailyVolume10Day: number; 
    averageDailyVolume3Month: number; 
    bookValue: number; 
    earningsTimestamp: number; 
    earningsTimestampStart: number; 
    earningsTimestampEnd: number; 
    epsCurrentYear: number; 
    epsForward: number; 
    epsTrailingTwelveMonths: number; 
    forwardPE: number; 
    trailingPE: number; 
    priceEpsCurrentYear: number; 
    priceToBook: number; 
    marketCap: number; 
    sharesOutstanding: number;
}

type SummaryData = {
    quoteSummary: {
        result: SummaryResult[];
        "error": SummaryError;
    }
}

type SummaryResult = {
    "assetProfile": {
        "longBusinessSummary": string;
    }
}

type SummaryError = {
    code: string;
    description: string;
}

type HistoricalPricesOptions = {
    symbol: string;
    interval: HistoricalPricesInterval;
    range: HistoricalPricesRange;
    close: "adjusted" | "unadjusted";
    includePrePost: boolean;
}

type HistoricalPricesInterval = "5m" | "15m" |  "1d" | "1wk" | "1mo";
type HistoricalPricesRange = "1d" | "5d"  | "1mo" | "1y"  | "max";

type HistoricalPricesData = {
    chart: {
        result: HistoricalPrices[];
        error: any;
    }
}

type HistoricalPrices = {
    meta: HistoricalPricesMeta;
    timestamp: number[];
    indicators: {
        quote: HistoricalPricesQuote[];
    }
}

type HistoricalPricesMeta = {
    currency: string;
    symbol: string;
    exchangeName: string;
    instrumentType: string;
    firstTradeDate: number;
    regularMarketTime: number;
    hasPrePostMarketData: boolean;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    priceHint: number;
    currentTradingPeriod: {
        pre: {
            timezone: string;
            start: number;
            end: number;
            gmtoffset: number;
        };
        regular: {
            timezone: string;
            start: number;
            end: number;
            gmtoffset: number;
        };
        post: {
            timezone: string;
            start: number;
            end: number;
            gmtoffset: number;
        };
    };
    dataGranularity: string;
    range: string;
    validRanges: string[];
}

type HistoricPricesIndicators = {
    quote: {
        low: number[];
        close: number[];
        high: number[];
        open: number[];
        volume: number[];
    }[];
    adjclose: {
        adjclose: number[];
    }[];
}

type HistoricalPricesPoint = {
    date: Date;
    value: number;
}
