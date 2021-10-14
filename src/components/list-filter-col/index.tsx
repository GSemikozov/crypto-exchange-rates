import React, { useEffect, useState, useRef } from "react";

import { SingleValue } from "react-select";
import { useMediaQuery } from "react-responsive";

import { ListSelectFilter } from "../list-select-filter";

import { MediaBreakpointsEnum } from "../../types";

import { useOnClickOutside } from "../../hooks/useOnClickOutside";

import styles from "./list-filter-col.module.css";

export const ListFilterCol = ({
    handleChangeRangeParam,
    dateRangeParam,
}: {
    handleChangeRangeParam: (option: SingleValue<string>) => void;
    dateRangeParam: string;
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);

    const isMobile = useMediaQuery({ maxWidth: MediaBreakpointsEnum.sm });

    const handleShowFilter = () => {
        setIsFilterOpen((prev) => !prev);
    };

    const btnRef = useRef<HTMLButtonElement>(null);

    useOnClickOutside(btnRef, () => {
        setIsFilterOpen(false);
    });

    useEffect(() => {
        isMobile && setIsFilterOpen(false);
    }, [isMobile]);

    return (
        <div>
            {isMobile && (
                <button ref={btnRef} className={styles.btn} onClick={handleShowFilter}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
                    </svg>
                </button>
            )}
            <ListSelectFilter
                onChange={handleChangeRangeParam}
                defaultValue={dateRangeParam}
                isVisible={isFilterOpen}
            />
        </div>
    );
};
