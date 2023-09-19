import styles from "./scroll.module.css";

import { useState, useEffect } from 'react';

var limit = 1;

const Scroll = () => {
    //var limit = Math.max(document.body.scrollHeight, 
    //    document.body.offsetHeight, 
    //    document.documentElement.clientHeight, 
    //    document.documentElement.scrollHeight, 
    //    document.documentElement.offsetHeight);

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        limit = document.documentElement.clientHeight;
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        function handleResize() {
          limit = document.documentElement.clientHeight;
        }
    
        window.addEventListener('resize', handleResize)
    })

    return (
        <div className={styles['scroll-bar']}>
           
            <div className={styles['scroll-dot']} style={{ 
                //transform: `translateY(${(scrollY / limit) * limit * 0.3}px)`
                top: `calc(${(scrollY / limit) * 100}% - 0.25vw)`
            }}/>
        
        </div>
    )
}

export default Scroll;