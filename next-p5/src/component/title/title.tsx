import styles from "./title.module.css";
import cstyles from "../cursor/cursor.module.css"

import {
    AiFillGithub,
    AiFillLinkedin,
    AiFillMail
} from 'react-icons/ai';

interface P {
    setCursor: any;
}

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
        
            <div className={styles.icons}>
                <AiFillGithub size={32} />
                <AiFillLinkedin size={32} />
                <AiFillMail size={32} />
            </div>

        </div>
    )
}

export default Title;