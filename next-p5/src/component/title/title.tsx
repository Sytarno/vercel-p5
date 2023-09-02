import localFont from 'next/font/local'
import { ThemeProvider } from "next-themes";

import styles from "./title.module.css";

const Title = () => {
    return (
        <div className={styles.container}>
        
            <div>
            Evan Nguyen
            </div>
            
            <div 
            style={{
                fontSize: '40%',
            }}>
            new-grad
            </div>
        
        </div>
    )
}

export default Title;