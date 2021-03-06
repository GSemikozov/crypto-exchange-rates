import axios, { AxiosResponse } from "axios";

import { API_URL, PROXY } from "../constants";

export const getData = async (period: string): Promise<AxiosResponse> =>
    await axios.get(`${PROXY}/${API_URL}`, {
        params: {
            currency: "USD",
            updates_from: "1629894793",
            period: period,
            no_charts: "true",
        },
    });
