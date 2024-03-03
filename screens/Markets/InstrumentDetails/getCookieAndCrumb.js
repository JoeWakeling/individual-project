const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15"

// Get the A3 cookie
const cookieResponse = await fetch("https://fc.yahoo.com", {
    method: 'GET',
    credentials: 'omit',
});
const cookie_response = cookieResponse.headers.get('set-cookie');
if (!cookie_response) {
    throw new Error("Failed to get yahoo crumb");
}
const cookie = cookie_response.split(";").find(part => part.trim().startsWith("A3="));
if (!cookie) {
    throw new Error("Invalid yahoo crumb response - likely bad cookie");
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
if (!crumb) {
    throw new Error("Failed to get yahoo crumb");
}