import styles from "./title.module.css";
import cstyles from "@/component/cursor/cursor.module.css"
import { AnimatedText } from "@/effects/text/text";
import Link from "next/link";

import {
    AiFillGithub,
    AiFillLinkedin,
} from 'react-icons/ai';

import {
    RiMailFill
} from 'react-icons/ri'

import { P } from "../interface";
import { useCursor } from "../cursor/cursorContext";
import { useCallback, useEffect, useRef, useState } from "react";

const Title: React.FC<P> = (props) => {
    const { setCursor } = useCursor();

    const rotation: String[] = [
        "new-grad",
        "software engineer",
        "now open source!",
        "full stack developer",
        "AR/VR enthusiast",
        "rhythm gamer",
        "UI/UX designer",
        "click to draw?",
        "made with love",
    ];

    const [index, setIndex] = useState(0);
    const [int, setInt] = useState<NodeJS.Timeout>();

    const indexRef = useRef(index);

    const forward = useCallback(() => {
        setIndex((indexRef.current+1) % rotation.length);
    }, [rotation.length]);

    useEffect(() => {
        indexRef.current = index;
    }, [index]);

    useEffect(() => {
        const interval = setInterval(() => {
            forward();
        }, 5000);

        setInt(interval);

        return () => clearInterval(interval);
    }, [forward]);

    return (
        <div className={styles.container} onMouseLeave={() => setCursor("")}>
        
            <h1>
            Evan Nguyen
            </h1>

            <a>
            <AnimatedText text={rotation[index]}
            onMouseEnter={() => setCursor(`${cstyles.onheader}`)}
            onMouseLeave={() => setCursor("")}
            onClick={() => {
                if(int){
                    clearInterval(int);
                }

                forward();

                const interval = setInterval(() => {
                    forward();
                }, 5000);
        
                setInt(interval);

                return () => clearInterval(interval);
            }}
            />
            </a>
        
        
            <div className={styles['icon-container']} onMouseEnter={() => setCursor("")}>
                <Link href="https://github.com/Sytarno" target="_blank"><AiFillGithub className={styles.icon} size={32}/></Link>
                <Link href="https://www.linkedin.com/in/evannguyen11/" target="_blank"><AiFillLinkedin className={styles.icon} size={32}/></Link>
                <RiMailFill className={styles.icon} size={32}/>
                <AiFillGithub className={styles.placehold} size={32} />
            </div>

        </div>
    )
}

export default Title;