export const PROXY =
    window.location.hostname === "localhost"
        ? "https://cors-anywhere.herokuapp.com"
        : "/cors-proxy";

export const API_URL = "https://coin360.com/api/coins";
