import styles from "./display.module.css";

import { P, Md } from "../interface";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "../cursor/cursorContext";
import { useEffect, useState } from "react";

import Card from "@/component/card/card";

const Loading = () => {
  return (
    <div className={styles['loading']}>
      Loading...
    </div>
  )
}

//const Display = () => {
const Display: React.FC<P> = ({ projects = [], query }) => {
  const { setCursor } = useCursor();
  const [onColumn, setOnColumn] = useState(1);
  const [displayed, setDisplayed] = useState<Md[]>([]);
  
  const [factor, setFactor] = useState(0.1);

  useEffect(() => {
    if(onColumn == 0.25){ setFactor(0.1) } else { setFactor(0.1) }
  }, [onColumn])

  useEffect(() => {
    //
    setDisplayed(projects);
  }, [projects]);

  useEffect(() => {
    const handleQuery = () => {
      if(query){
        setDisplayed(projects.filter((proj) => query.every(cond => proj.tech ? proj.tech.includes(cond) ? proj : null : null)));
      }
    }

    handleQuery();
  }, [query, projects])

  return (
      <div className={styles['column']}>
        <AnimatePresence>
        { displayed.length ?
          (displayed.map( (slug: any, id: number) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: onColumn, y: 0, transition: { duration: 0.5, delay: id * factor}}}
              exit={{ opacity: 0, x: 20, transition: {duration: 0.5, delay: id * factor} }}
              
              whileHover={{ opacity: 1, transition: { delay: 0 } }}
              
              onHoverStart={() => setOnColumn(0.25)}
              onHoverEnd={() => setOnColumn(1)}
            >
            {
              Card(slug, setCursor)
            }
            </motion.div> 
          ))) : <Loading/>
        } 
        </AnimatePresence>
      </div>
  )
}

export default Display;