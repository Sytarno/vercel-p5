import styles from "./title.module.css";
import cstyles from "../cursor/cursor.module.css"

import {
    AiFillGithub,
    AiFillLinkedin,
} from 'react-icons/ai';

import {
    RiMailFill
} from 'react-icons/ri'

import { P } from "../interface";

const Title: React.FC<P> = (props) => {
    return (
        <div className={styles.container}>
        
            <h1>
            Evan Nguyen
            </h1>

            <p>
                <a
                onMouseEnter={() => props.setCursor(`${cstyles.onheader}`)}
                onMouseLeave={() => props.setCursor("")}
                >
                new-grad
                </a>
            </p>
        
            <div className={styles['icon-container']}>
                <AiFillGithub className={styles.icon} size={32} />
                <AiFillLinkedin className={styles.icon} size={32} />
                <RiMailFill className={styles.icon} size={32} />
                <AiFillGithub className={styles.placehold} size={32} />
            </div>

        </div>
    )
}

export default Title;