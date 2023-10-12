import styles from "./display.module.css";
import cstyles from "@/component/cursor/cursor.module.css";

import { Md, P } from "../interface";

import { useEffect, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "../cursor/cursorContext";

const Card = (project: Md, setCursor: any) => {
  
  //console.log(project);
  return (
    <div className={styles['card']}>
      {
      project.year && project.month ? <div className={styles['date']}>
        {
        project.month + " " + project.year
        }
      </div> : <></>
      } 
      
      <div className={styles['body']}>
        
        <div className={styles['title']}
          onMouseEnter={() => setCursor(`${cstyles.onheader}`)}
          onMouseLeave={() => setCursor("")}
        >{project.title} 
          { project.link ? <div className={styles['icon']}><HiOutlineExternalLink/></div> : <></> }
        </div>
        <div className={styles['description']}>{project.description}</div>
      
        <div className={styles['frameworks']}>
        {          
          project.tech ? 
            (project.tech.map( (obj, id) => (
            <div className={styles['skill']} key={id}><a>{obj}</a></div>
          ))) : <></>
        }
        </div>
      </div>
    </div>
  )
}

const Loading = () => {
  return (
    <div className={styles['loading']}>
      Loading...
    </div>
  )
}

//const Display = () => {
const Display: React.FC<P> = ({ projects }) => {
  const { setCursor } = useCursor();
  
  return (
      <div className={styles['column']}>
        <AnimatePresence>
        { !projects ? <Loading/> :
          (projects.map( (slug: any, id: number) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: id * 0.1}}
            >
              {Card(slug, setCursor)}
            </motion.div>
          )))
        } 
        </AnimatePresence>
      </div>
  )
}

export default Display;