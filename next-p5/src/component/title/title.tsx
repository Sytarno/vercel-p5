import localFont from 'next/font/local'
import { ThemeProvider } from "next-themes";

import styles from "./title.module.css";

const Title = () => {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Evan Nguyen
            </div>
        </div>
    )
}

export default Title;