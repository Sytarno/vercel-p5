//ensure all interfaces share attributes

interface P {
    setCursor?: any;
}

interface Md {
    title: string,
    description: string,
    image?: string,

    link?: string,
    stargazers?: number,
    last_commit?: Date;
}

export type {
    Md,
    P
};
