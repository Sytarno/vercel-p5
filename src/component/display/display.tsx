import styles from "./display.module.css";

import { P } from "../interface";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "../cursor/cursorContext";

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

  return (
      <div className={styles['column']}>
        <AnimatePresence>
        { (projects.length > 1) ?
          (projects.map( (slug: any, id: number) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: id * 0.1}}
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