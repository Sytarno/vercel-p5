import styles from "./display.module.css";
import matter from "gray-matter";

const Display = () => {
    const fd = __dirname + "/../../../public/proj/";
    const names = [
        'Athena',
        'freshmaps',
        'primary-evann',
        'sytarno.github.io',
        'vercel-p5',
    ];

    names.forEach( (name) => {
        const f = matter.read(fd + name + ".md");
        //console.log(f);
    });
    

    return (
        <div className={styles['column']}>
        </div>
    )
}

export default Display;