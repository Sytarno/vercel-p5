import styles from "./display.module.css";

import { P, Md } from "../interface";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "../cursor/cursorContext";
import { useEffect, useRef, useState } from "react";

import Card from "@/component/card/card";

const comparator = ([projA, A, idA]: [Md, number, number], [projB, B, idB]: [Md, number, number]) => {
  if(A != B){
    return B-A;
  }else if(projA.dateInt != projB.dateInt){
    return projB.dateInt - projA.dateInt;
  }else{
    return projA.title.localeCompare(projB.title);
  }
}

const Loading = () => {
  return (
    <div className={styles['loading']}>
      Loading...
    </div>
  )
}

//const Display = () => {
const Display: React.FC<P> = ({ projects = [], query, loading }) => {
  const { setCursor } = useCursor();
  const [onColumn, setOnColumn] = useState(1);
  const [displayed, setDisplayed] = useState<[Md, number, number][]>([]);
  

  const displayedRef = useRef(displayed);

  useEffect(() => {
    displayedRef.current = displayed;
  }, [displayed]);


  const [factor, setFactor] = useState(0.1);

  useEffect(() => {
    if(onColumn == 0.25){ setFactor(0.1) } else { setFactor(0.1) } //can't pre-emptively set the delay, so useless.
  }, [onColumn]);

  useEffect(() => {
    let initial: [Md, number, number][] = projects.map((mdx, id) => [mdx, 0, id]);
    setDisplayed(initial.sort(comparator));
  }, [projects]);

  useEffect(() => {
    const handleQuery = () => {
      if(query && query.length){
        /*query.every(cond => mdx.tech?.includes(cond)) ? 1 : 0*/
        let results: [Md, number, number][] = displayedRef.current.map( ([proj, bool, id], iterator) => [proj, query.every(cond => proj.tech?.includes(cond)) ? 1 : 0, id]);
        setDisplayed(results.sort(comparator));
      }else{
        let results: [Md, number, number][] = displayedRef.current.map( ([proj, bool, id], iterator) => [proj, 0, id]);
        setDisplayed(results.sort(comparator));
      }
    }

    handleQuery();
  }, [query]);

  useEffect(() => {
    //
  }, [displayed]);

  return (
      <div className={styles['column']}>
        <AnimatePresence>
        { !loading ?
          
          (displayed.map( ([slug, valid, id]: [Md, number, number], it: number) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: onColumn, y: 0, transition: { duration: 0.5, delay: it * factor }}}
              exit={{ opacity: 0, x: 20, transition: {duration: 0.5, delay: it * factor} }}
              layout={true}
              whileHover={{ opacity: 1 }}
              
              onHoverStart={() => setOnColumn(0.25)}
              onHoverEnd={() => setOnColumn(1)}
            >
              <Card project={slug} setCursor={setCursor} selected={valid}/>
            </motion.div>
          )))
          : <Loading/>
        } 
        </AnimatePresence>
      </div>
  )
}

export default Display;