import styles from "./skills.module.css";

import { useEffect, useState } from "react";
import { P, Md } from "../interface";
import { AnimatePresence, motion } from "framer-motion";

import { useCursor } from "@/component/cursor/cursorContext";
import  cstyles  from "@/component/cursor/cursor.module.css";

const build = (projects: Md[]) =>{
    const o: Record<string, number> = {};
    if(projects.length){
        projects.forEach((proj) => {
            
            if(proj.tech){ 
                proj.tech.forEach((x) => {
                    o[x] = (o[x] || 0) + 1;
                })
            }
        })
    }
    return o;
}

const comparator = ([A, numA]: [string, number], [B, numB]: [string, number]) => {
    if(numA != numB){
        return numB-numA;
    }
    return A.localeCompare(B);
}

const Skills: React.FC<P> = ({ projects = [], setQuery }) => {
    const [frequency, setFrequency] = useState<[string, number][]>([]);
    const [max, setMax] = useState(0);
    const { setCursor } = useCursor();

    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (key: string) => {
        if(selected.includes(key)){
            setSelected(selected.filter((iid) => iid != key));
        }else{
            setSelected([...selected, key]);
        }
    }

    useEffect(() => {
        if(!projects.length){ return; }
        if(setQuery) { setQuery(selected); }

        const query = selected;

        console.log("result", selected, query);

        let leftover = projects;
        if(query.length){
    
            leftover = projects.filter((proj) => query.every(cond => proj.tech ? proj.tech.includes(cond) ? proj : null : null));
        }

        let res = build(leftover);

        const sorted = Object.entries(res).sort(comparator);

        setFrequency(sorted);
        setMax(sorted[0][1]);
    }, [selected, projects])

    return (
        <AnimatePresence>
            <div className={styles['frameworks']}>
            {          
                frequency ? 
                (frequency.map( ([name, count], id) => (
                
                <motion.div 
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: id * 0.1}}
                    className={`${styles['skill']} ${selected.includes(name) ? styles['select-black'] : ""}`}
                    onClick={() => toggle(name)}

                    onMouseEnter={() => setCursor(cstyles['onheader'])}
                    onMouseLeave={() => setCursor("")}
                ><p>
                    {name}
                </p>
                <motion.div className={selected.includes(name) ? styles['select'] : styles['partial']} animate={{ width: `${count / max * 100}%` }}>&nbsp;</motion.div>
                </motion.div>
                ))) : <></>
            }
            </div>
        </AnimatePresence>
    )
}

export default Skills