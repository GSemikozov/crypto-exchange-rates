import { useEffect, RefObject } from "react";

export const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: (e: Event) => void) => {
    useEffect(() => {
        const listener = (event: Event) => {
            !ref.current?.contains(event.target as Node) && handler(event);
        };
        document.addEventListener("click", listener);
        return () => {
            document.removeEventListener("click", listener);
        };
    }, [ref, handler]);
};
