"use client";

import { useEffect, useState } from "react";
import styles from "./cursor.module.css"

interface P {
    cursor: any;
}

const Cursor: React.FC<P> = (props) => {
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
        <div className={`${styles.cursorparent}`} style={{ 
            //left: cursorPos.x,
            //top: cursorPos.y
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`
        }}>
            {<div className={`${styles.cursordot} ${props.cursor}`} ></div>
            }
        </div>
    );
}

export default Cursor