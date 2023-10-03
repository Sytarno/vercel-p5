import styles from "./display.module.css";
import { Md } from "../interface";

const Card = (project: Md) => {
  
}

//const Display = () => {
const Display = ({ projects = [] }: any) => {
  return (
      <div className={styles['column']}>
        {
          projects.map( (slug: any, id: number) => (
            <div key={id}>
              {slug.title}
            </div>
          ))
        } 
      </div>
  )
}

export default Display;