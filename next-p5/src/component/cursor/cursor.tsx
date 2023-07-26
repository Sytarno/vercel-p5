"use client";

import { useEffect, useState } from "react";
import styles from "./cursor.module.css"

const Cursor: React.FC = () => {
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const mouseMoveHandler = (e: MouseEvent) => {
            requestAnimationFrame(() => {
            setCursorPos({x: e.clientX, y: e.clientY})
            });
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        
        return () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
        }
    }, []);

    return (
        <div className={styles.cursorparent} style={{ 
            //left: cursorPos.x,
            //top: cursorPos.y
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`
        }}>
            {<div className={styles.cursordot} ></div>
            }
        </div>
    );
}

export default Cursor