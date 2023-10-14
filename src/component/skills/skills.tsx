import styles from "./skills.module.css";


import { useEffect, useState } from "react";
import { P } from "../interface";
import { AnimatePresence, motion } from "framer-motion";

const Skills: React.FC<P> = ({ projects = [], setQuery }) => {
    const [frequency, setFrequency] = useState<[string, number][]>([]);

    useEffect(() => {
        const build = () =>{
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

        let res = build();
        
        const sorted = Object.entries(res).sort(
            ([A, numA], [B, numB]) => {
                if(numA != numB){
                    return numB-numA;
                }
                return A.localeCompare(B);
            }
        )

        setFrequency(sorted);
    }, [projects]);

    const [selected, setSelected] = useState<number[]>([]);

    const toggle = (id: number) => {
        if(selected.includes(id)){
            setSelected(selected.filter((iid) => iid != id));
        }else{
            setSelected([...selected, id]);
        }
    }

    useEffect(() => {
        if(setQuery){ setQuery(selected.map((ind) => frequency[ind][0])); }
    }, [selected, frequency, setQuery])

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
                    className={`${styles['skill']} ${selected.includes(id) ? styles['select'] : ''}`}
                    onClick={() => toggle(id)}
                ><p>{name}</p></motion.div>
                
                ))) : <></>
            }
            </div>
        </AnimatePresence>
    )
}

export default Skills