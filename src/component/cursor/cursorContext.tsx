import { useContext, useState, createContext } from 'react';

const CursorContext = createContext({
    cursor: "",
    setCursor: (cursor: string) => {}
})

export const CursorProvider = ({ children }: any) => {
    const [cursor, setCursor] = useState('');

    return (
        <CursorContext.Provider value={{ cursor, setCursor }}>
            {children}
        </CursorContext.Provider>
    );
};

export const useCursor = () => {
    return useContext(CursorContext);
}