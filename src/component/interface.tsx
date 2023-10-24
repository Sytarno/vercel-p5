//ensure all interfaces share attributes

import { Dispatch, SetStateAction } from "react";

interface P {
    loading?: boolean;
    projects?: Md[];
    query?: string[];
    setQuery?: Dispatch<SetStateAction<string[]>>;
    logoPos?: [number, number];
    setLogoPos?: Dispatch<SetStateAction<[number, number]>>;
    isMobile?: boolean;
}

interface Md {
    title: string,
    description: string,

    link?: string,
    image?: string,

    dateInt: number;
    month?: string,
    year?: string,
    
    tech?: string[],

    stargazers?: number,
}

interface MdImport {
    title: string,
    description: string,

    link?: string,
    image?: string,

    date?: string,

    tech?: string[]
}

export type {
    Md, MdImport,
    P
};
