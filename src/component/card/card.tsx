import styles from "./card.module.css";
import cstyles from "@/component/cursor/cursor.module.css";

import { Md } from "../interface";
import { HiOutlineExternalLink } from "react-icons/hi";
import Link from "next/link";

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
        
        <div className={styles['title']}>
          
          { project.link ? 
          
          <Link href={project.link} target="_blank">
          <span 
          onMouseEnter={() => setCursor(`${cstyles.onheader}`)}
          onMouseLeave={() => setCursor("")}
          className="flex items-center">{ project.title }
          
          <div className={styles['icon']}><HiOutlineExternalLink/></div>
          </span> 
          </Link>
          : 
          
          <span 
          onMouseEnter={() => setCursor(`${cstyles.onheader}`)}
          onMouseLeave={() => setCursor("")}
          className="flex items-center">{ project.title }
          </span>

          }
          
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

export default Card;