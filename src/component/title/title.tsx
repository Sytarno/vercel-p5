import styles from "./title.module.css";
import cstyles from "@/component/cursor/cursor.module.css"
import { AnimatedText } from "@/effects/text/text";
import Link from "next/link";
import Squares from "./squares";

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

function getPosition( element: HTMLElement ) {
    var rect = element.getBoundingClientRect();
    return {
        x: (rect.left + rect.right) / 2,
        y: (rect.top + rect.bottom) / 2,
    };
}

const Title: React.FC<P> = ({ setLogoPos, isMobile = false }) => {
    const { setCursor } = useCursor();

    const [index, setIndex] = useState(0);
    const [int, setInt] = useState<NodeJS.Timeout>();
    const [rotation, setRotation] = useState<string[]>([""]);

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

    useEffect(() => {
        if(!isMobile && setLogoPos){ 
            const onResize = () => {
                var ele = document.getElementById("placeholder");
                if(ele){ 
                    var pos = getPosition(ele);
                    setLogoPos([pos.x, pos.y]);
                }
            }   
            
            onResize();

            setRotation(
                [
                "new-grad",
                "software engineer",
                "now open source!",
                "full stack developer",
                "AR/VR enthusiast",
                "rhythm gamer",
                "UI/UX designer",
                "click to draw?",
                "made with love",
                ]
            );

            window.addEventListener("resize", onResize);
            return () => {
                window.removeEventListener("resize", onResize);
            };
        }else{
            
            setRotation(
                [
                "new-grad",
                "software engineer",
                "now open source!",
                "full stack developer",
                "AR/VR enthusiast",
                "rhythm gamer",
                "UI/UX designer",
                "made with love",
                ]
            );
        }
    }, [isMobile, setLogoPos]);

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
                <Link href="mailto:evannguyen1101@yahoo.com"><RiMailFill className={styles.icon} size={32}/></Link>
                <div className={isMobile ? styles['logoMobile'] : styles['logo']}>
                    { isMobile ? <Squares/> : <AiFillGithub id={"placeholder"} className={styles.placehold} size={32}/> }
                </div>
                <div className={styles['logoText']}>powered by Next.js</div>
            </div>

        </div>
    )
}

export default Title;