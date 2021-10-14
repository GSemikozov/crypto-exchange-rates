import React from "react";

import styles from "./list-item.module.scss";
import { RowCell } from "../list-item-cell";
import { RespDataItem } from "../../types";

export const ListItem = ({
    dataItem,
    btcRate,
    ethRate,
    usdtRate,
}: {
    dataItem: RespDataItem | undefined;
    btcRate: RespDataItem | undefined;
    ethRate: RespDataItem | undefined;
    usdtRate: RespDataItem | undefined;
}) => (
    <div className={styles.listItem}>
        <div>{dataItem ? dataItem.s : "-"}</div>
        <div>
            {btcRate && dataItem ? <RowCell dataItem={dataItem} relatedItem={btcRate} /> : "-"}
        </div>
        <div>
            {ethRate && dataItem ? <RowCell dataItem={dataItem} relatedItem={ethRate} /> : "-"}
        </div>
        <div>
            {usdtRate && dataItem ? <RowCell dataItem={dataItem} relatedItem={usdtRate} /> : "-"}
        </div>
    </div>
);
