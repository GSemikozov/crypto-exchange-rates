import axios, { AxiosResponse } from "axios";

import { config } from "../constants";

export const getData = async (period: string): Promise<AxiosResponse> =>
    await axios.get(`${config.url.API_URL}`, {
        params: {
            currency: "USD",
            updates_from: "1629894793",
            period: period,
            no_charts: "true",
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: "*/*",
            accepts: "application/json",
        },
    });
