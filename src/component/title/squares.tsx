import styles from "./squares.module.css";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Squares = () => {
    const [order, setOrder] = useState<string[]>([
        "#ffc2d7",
        "#e7bbff",
        "#c7b2ff",
        "#c9d9ff"
    ]);

    useEffect(() => {
        const interval = setInterval(() => { 
            setOrder([...order].sort(() => Math.random() - 0.5));
        }, 2500);

        return () => clearInterval(interval);
    }, [order]);

    return (
        <div className={styles['square']}>
            <div className={styles['squarebox']}>
            {
            order.map((background, id) => (
            <motion.li
                key={background}
                layout
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 120
                }}
                animate = {{ opacity: id == 0 ? 1 : 0.1 }}
                style={{ background }}
            />
            ))}
            </div>
        </div>
    )
}

export default Squares;