import React from "react";
import { BounceLoader } from "react-spinners";
import cx from "classnames";

import styles from "./loader.module.scss";

export const Loader = ({ isLoading = false }: { isLoading: boolean }) => (
    <div
        className={cx(styles.loader, {
            [styles.visible]: isLoading,
        })}
    >
        <BounceLoader size={100} color="#3DC383" loading={isLoading} />
    </div>
);
