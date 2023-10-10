import styles from "./display.module.css";
import cstyles from "@/component/cursor/cursor.module.css";
import { Md, P } from "../interface";
import { useEffect, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";

const Card = (project: Md, setCursor: any) => {
  let date: Date = new Date();

  if(project.date){
    date = new Date(project.date);
  }
  return (
    <div className={styles['card']}>
      <div className={styles['date']}>
        {date.toLocaleString('default', { month: 'short' }).toUpperCase() + " " +
        date.getFullYear()}
      </div>
      
      <div className={styles['body']}>
        
        <div className={styles['title']}
          onMouseEnter={() => setCursor(`${cstyles.onheader}`)}
          onMouseLeave={() => setCursor("")}
        >{project.title} 
          <div className={styles['icon']}><HiOutlineExternalLink/></div>
        </div>
        <div className={styles['description']}>{project.description}</div>
      
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
const Display: React.FC<P> = (props) => {
  const [projects, setProjects] = useState<Md[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        //await new Promise(resolve => setTimeout(resolve, 3000)) //for testing
        const response = await fetch(`/api/getMeta`);
        const data: Md[] = await response.json();
        setProjects(data);
        setLoading(false);

      } catch (error) {
        console.error("Error accessing md frontmatter:", error);
        setLoading(false);
        return [];
      }
    }

    fetchData();
  }, []);
  
  return (
      <div className={styles['column']}>
        { loading ? <Loading/> :
          (projects.map( (slug: any, id: number) => (
            <div key={id}>
              {Card(slug, props.setCursor)}
            </div>
          )))
        } 
      </div>
  )
}

export default Display;