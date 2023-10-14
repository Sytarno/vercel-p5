import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const defaultAnimation = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
        },
    },
};

export const AnimatedText = ({
    text,
    className,
    animate = defaultAnimation,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: any) => {

    const controls = useAnimation();
    const [currentText, setText] = useState(Array.isArray(text) ? text : [text]);

    useEffect(() => {
        setText(Array.isArray(text) ? text : [text]); //convert to array
    }, [text]);

    useEffect(() => {
        controls.start("visible"); //can add a listener to modify this later
    }, [currentText, controls]);

    return (
        <p className={className}>
            <span className={currentText.join(" ")}></span>
            <motion.span
                initial="hidden"
                animate={controls}
                variants={{
                    visible: { transition: { staggerChildren: 0.05 }},
                    hidden: {}
                }}
                aria-hidden
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            >
                {currentText.map((line: string, lineIndex: Number) => (
                    <span className="block" 
                    key={`${line}-${lineIndex}`}>
                        
                        {line.split(" ").map((word, wordIndex) => (
                            <span className="inline-block" 
                            key={`${word}-${wordIndex}`}>
                                
                                {word.split("").map((char, charIndex) => (
                                    <motion.span
                                        key={`${char}-${charIndex}`}
                                        className="inline-block"
                                        variants={animate}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                <span className="inline-block"> &nbsp; </span>
                            </span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </p>
    )
}