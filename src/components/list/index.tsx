import React, { useState, useEffect, useCallback } from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Options, SingleValue } from "react-select";

import { getData } from "../../api";

import { dataWithPrices } from "../../helpers";
import { BaseCryptoEnum, DataResponse, RespDataItem } from "../../types";
import { ListItem } from "../list-item";
import { Loader } from "../loader";

import styles from "./list.module.scss";
import { ListFilterCol } from "../list-filter-col";

export const selectOptions: Options<any> = [
    { value: "1h", label: "1h" },
    { value: "24h", label: "24h" },
    { value: "7d", label: "7d" },
    { value: "30d", label: "30d" },
];

export const List = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setLoadedData] = useState<DataResponse>();
    const [fetchDataErrorMessage, setFetchDataErrorMessage] = useState<string>();
    const [dateRangeParam, setDateRangeParam] = useState(selectOptions[1]);
    const [usdtRate, setUSDTRate] = useState<RespDataItem>();
    const [btcRate, setBTCRate] = useState<RespDataItem>();
    const [ethRate, setETHRate] = useState<RespDataItem>();

    const toggleLoading = () => {
        setIsLoading((prev) => !prev);
    };

    const fetchData = useCallback(() => {
        toggleLoading();
        // eslint-disable-next-line no-console
        console.log("gonna pass in fetchData", dateRangeParam);
        setTimeout(() => {
            getData(dateRangeParam.value)
                .then((resp) => {
                    const data = dataWithPrices(resp.data.data);
                    setLoadedData(data);
                    toggleLoading();
                })
                .catch((error) => {
                    new Error(error);
                    setFetchDataErrorMessage(error.message);
                    toggleLoading();
                });
        }, 3000);
    }, [dateRangeParam]);

    const handleChangeRangeParam = (option: SingleValue<string>) => {
        // eslint-disable-next-line no-console
        console.log("OPTION: ", option);
        setDateRangeParam(option);
    };

    const getCryptoRateObjByType = (data: DataResponse, cryptoType: BaseCryptoEnum) =>
        data.find((item: RespDataItem) => item.s.trim().toUpperCase() === cryptoType);

    const renderItem = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const dataItem = data && data[index];

        return (
            <div style={style} className={index % 2 ? styles.listItemOdd : styles.listItemEven}>
                <ListItem
                    dataItem={dataItem}
                    btcRate={btcRate}
                    ethRate={ethRate}
                    usdtRate={usdtRate}
                />
            </div>
        );
    };

    useEffect(() => {
        fetchData();
        // const interval = setInterval(() => {
        //     // eslint-disable-next-line no-console
        //     console.log("gonne refetch!");
        //     fetchData();
        // }, 10000);
        // return () => clearInterval(interval);
    }, [dateRangeParam, fetchData]);

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log("isLoading", isLoading);
    }, [isLoading]);

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log("data", data);
        const usdtRateObj = data && getCryptoRateObjByType(data, BaseCryptoEnum.usdt);
        const btcRateObj = data && getCryptoRateObjByType(data, BaseCryptoEnum.btc);
        const ethRateObj = data && getCryptoRateObjByType(data, BaseCryptoEnum.eth);

        // eslint-disable-next-line no-console
        console.log("set cryptos: ", usdtRate, btcRate, ethRate);

        usdtRateObj && setUSDTRate(usdtRateObj);
        btcRateObj && setBTCRate(btcRateObj);
        ethRateObj && setETHRate(ethRateObj);
    }, [data, btcRate, ethRate, usdtRate]);

    return (
        <div className={styles.list}>
            <Loader isLoading={isLoading} />
            <>
                <div className={styles.listTopRow}>
                    <ListFilterCol
                        handleChangeRangeParam={handleChangeRangeParam}
                        dateRangeParam={dateRangeParam}
                    />
                    <div>BTC</div>
                    <div>ETH</div>
                    <div>USDT</div>
                </div>
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={height - 72}
                            width={width}
                            itemSize={80}
                            itemCount={data !== undefined ? data.length : 0}
                        >
                            {renderItem}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </>
            {fetchDataErrorMessage && !isLoading && (
                <div className={styles.errorMessage}>{fetchDataErrorMessage}</div>
            )}
        </div>
    );
};
