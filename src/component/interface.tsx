//ensure all interfaces share attributes

interface P {
    loading?: boolean;
    projects?: Md[];
}

interface Md {
    title: string,
    description: string,

    link?: string,
    image?: string,

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
