export default function getTailwindColourFromInvestmentType(investmentType: string): string {
    console.log(investmentType);
    switch (investmentType) {
        case "Easy-access savings account":
            return "bg-green-700";
        case "Fixed-term savings account":
            return "bg-blue-700";
        case "ETF":
            return "bg-pink-700";
        case "ISA":
            return "bg-purple-600";
        case "Mutual fund":
            return "bg-purple-600";
        case "Stocks":
            return "bg-emerald-600";
        case "Stock":
            return "bg-emerald-600";
        case "Crypto":
            return "bg-red-600";
        default:
            return "bg-gray-700";
    }
}

export function getHexColourFromInvestmentType(investmentType: string): string {
    switch (investmentType) {
        case "Easy-access savings account":
            return "#2b6cb0";
        case "Fixed-term savings account":
            return "#2f855a";
        case "ETF":
            return "#b83280";
        case "ISA":
            return "#805ad5";
        case "Mutual fund":
            return "#805ad5";
        case "Stocks":
            return "#059669";
        case "Stock":
            return "#059669";
        case "Crypto":
            return "#e53e3e";
        default:
            return "#4a5568";
    }
}