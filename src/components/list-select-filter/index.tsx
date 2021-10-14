import React from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import cx from "classnames";

// import { SelectOptionType } from "../../types";
import { selectOptions } from "../list";

import styles from "./list-select-filter.module.scss";

export const ListSelectFilter = ({
    onChange,
    defaultValue,
    isVisible,
}: {
    onChange: (option: SingleValue<string>, actionMeta: ActionMeta<string>) => void;
    defaultValue: SingleValue<string>;
    isVisible: boolean;
}) => (
    <Select
        className={cx(styles.select, {
            [styles.isVisible]: isVisible,
        })}
        isMulti={false}
        onChange={onChange}
        defaultValue={defaultValue}
        options={selectOptions}
    />
);
