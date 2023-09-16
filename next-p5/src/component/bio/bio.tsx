import styles from "./bio.module.css";
import cstyles from "../cursor/cursor.module.css"

import P from "../interface";

const Bio: React.FC<P> = (props) => {
    return (
    <div className={styles.container}>
        I’m a meticulous coder who loves design and utility. 
        My focus is creating sustainable and robust digital systems.
    </div>
    )
}

export default Bio;