import localFont from 'next/font/local'

import styles from "./title.module.css";
import cstyles from "../cursor/cursor.module.css"

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
        
        </div>
    )
}

export default Title;