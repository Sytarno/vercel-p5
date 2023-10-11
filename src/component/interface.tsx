//ensure all interfaces share attributes

interface P {
    setCursor?: any;
}

interface Md {
    title: string,
    description: string,

    link?: string,
    image?: string,
    date?: string,
    tech?: string[],

    stargazers?: number,
    last_commit?: Date
}

export type {
    Md,
    P
};
