import { P } from "../interface";
import styles from "./scroll.module.css";

import { useState, useEffect } from 'react';

const Scroll: React.FC<P> = ({ projects }) => {
    const [limit, setLimit] = useState(1);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        async function onResize(){
            await new Promise(resolve => setTimeout(resolve, 50)); //for some reason, I have to wait for the animation transition to complete.
            var body = document.body, html = document.documentElement;
            let l = Math.max( 
                body.scrollHeight, body.offsetHeight, 
                html.clientHeight, html.scrollHeight, 
                html.offsetHeight
            ) - window.innerHeight;
            setLimit(l);
        } 

        onResize();
    }, [projects])

    useEffect(() => {
        const onResize = () => {
            var body = document.body, html = document.documentElement;
            let l = Math.max( 
                body.scrollHeight, body.offsetHeight, 
                html.clientHeight, html.scrollHeight, 
                html.offsetHeight
            ) - window.innerHeight;
            setLimit(l);
        };
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={styles['scroll-bar']}>
           
            <div className={styles['scroll-dot']} style={{ 
                //transform: `translateY(${(scrollY / limit) * limit * 0.3}px)`
                top: `calc(${(scrollY / limit) * 100}% - 0.5vw)`
            }}/>
        
        </div>
    )
}

export default Scroll;