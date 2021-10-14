export enum BaseCryptoEnum {
    usdt = "USDT",
    btc = "BTC",
    eth = "ETH",
}

export enum MediaBreakpointsEnum {
    xs = 568,
    sm = 667,
    md = 768,
    lg = 992,
    xl = 1200,
}

export type RespDataItem = {
    p: number;
    pb: number;
    v: number;
    mc: number;
    mcr: number;
    ch: number;
    s: string;
    em: number;
};

export type DataResponse = RespDataItem[];
