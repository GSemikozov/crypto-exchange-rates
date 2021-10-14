import React from "react";
import Big from "big.js";

import { RespDataItem } from "../../types";

// const getPercentOfTotal = (share: BigSource, total: BigSource) =>
//     Number(Big(share).div(total).times(100));

export const RowCell = React.memo(
    ({ dataItem, relatedItem }: { dataItem: RespDataItem; relatedItem: RespDataItem }) => {
        // const getPrevCryptoPrice = (crypto: RespDataItem) => crypto.p * (1 - crypto.ch / 100);
        const getPrevCryptoPrice = (crypto: RespDataItem) => {
            const cryptoPrice = Big(crypto.p);
            const cryptoCh = Big(crypto.ch);
            return cryptoPrice.times(cryptoCh.div(100).minus(1).times(-1));
        };
        const getCryptoRatio = (crypto1: RespDataItem, crypto2: RespDataItem) => {
            const prevPriceCrypto1 = getPrevCryptoPrice(crypto1);
            const prevPriceCrypto2 = getPrevCryptoPrice(crypto2);
            const howMuchOneInAnotherPrev = prevPriceCrypto1.div(prevPriceCrypto2); // was in usdt
            const howMuchOneInAnother = Big(crypto1.p).div(Big(crypto2.p)); // was in usdt
            const ratio = howMuchOneInAnother
                .minus(howMuchOneInAnotherPrev)
                .div(howMuchOneInAnotherPrev);
            // @ts-ignore
            // eslint-disable-next-line no-console
            console.log("ratio: ", `${+ratio.toFixed(2)}`);
            return +ratio.toFixed(2);
        };

        const ratio = getCryptoRatio(dataItem, relatedItem);
        const isZero = Math.sign(ratio) === 0;

        const highlightStyle = () => {
            switch (Math.sign(ratio)) {
                case 1:
                    return "var(--green)";
                case -1:
                    return "var(--red)";
                case 0:
                default:
                    return "";
            }
        };

        return (
            <div style={{ color: highlightStyle() }}>
                {dataItem.s !== relatedItem.s ? `${ratio}${!isZero ? "%" : ""}` : "-"}
            </div>
        );
    },
);
