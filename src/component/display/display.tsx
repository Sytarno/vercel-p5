import styles from "./display.module.css";
import { Md } from "../interface";

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

//const Display = () => {
const Display = ({ projects = [] }: any) => {
  return (
      <div className={styles['column']}>
        {
          projects.map( (slug: any, id: number) => (
            <div key={id}>
              {Card(slug)}
            </div>
          ))
        } 
      </div>
  )
}

export default Display;