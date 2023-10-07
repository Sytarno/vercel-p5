import styles from "./display.module.css";
import { Md } from "../interface";
import { useEffect, useState } from "react";

const Card = (project: Md) => {
  return (
    <div className={styles['card']}>
      <div className={styles['date']}>OCT 2017</div>
      <div className={styles['body']}>
        <div className={styles['title']}>{project.title}</div>
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
const Display = () => {
  const [projects, setProjects] = useState<Md[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000)) //for testing
        const response = await fetch(`/api/getMeta`);
        const data: Md[] = await response.json();
        setProjects(data);
        setLoading(false);

      } catch (error) {
        console.error("Error accessing md frontmatter:", error);
        return [];
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  
  return (
      <div className={styles['column']}>
        { loading ? <Loading/> :
          (projects.map( (slug: any, id: number) => (
            <div key={id}>
              {Card(slug)}
            </div>
          )))
        } 
      </div>
  )
}

export default Display;