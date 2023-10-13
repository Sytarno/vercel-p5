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
import { useState } from "react";

const Title: React.FC<P> = (props) => {
    const { setCursor } = useCursor();

    const rotation: String[] = [
        "new-grad",
        "software engineer",
        "now open source!",
        "full stack developer",
        "AR/VR enthusiast",
        "rhythm gamer",
        "minimal designer",
    ];

    const [index, setIndex] = useState(0);

    const forward = () => {
        setIndex((index+1) % rotation.length);
    }

    return (
        <div className={styles.container}>
        
            <h1>
            Evan Nguyen
            </h1>

            <a>
            <AnimatedText text={rotation[index]}
            onMouseEnter={() => setCursor(`${cstyles.onheader}`)}
            onMouseLeave={() => setCursor("")}
            onClick={() => forward()}
            />
            </a>
        
        
            <div className={styles['icon-container']}>
                <Link href="https://github.com/Sytarno" target="_blank"><AiFillGithub className={styles.icon} size={32}/></Link>
                <Link href="https://www.linkedin.com/in/evannguyen11/" target="_blank"><AiFillLinkedin className={styles.icon} size={32}/></Link>
                <RiMailFill className={styles.icon} size={32}/>
                <AiFillGithub className={styles.placehold} size={32} />
            </div>

        </div>
    )
}

export default Title;