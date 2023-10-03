import styles from "./display.module.css";
import { Md } from "../interface";
import { useEffect } from "react";

const Card = (project: Md) => {
  
}

//const Display = () => {
const Display = ({ projects = [] }: any) => {

  useEffect(() => {
    if(projects.length == 0){
      const m: Md = {
        title: "dummy_title",
        description: "dummy_description",
        link: "dummy_link",
      }
      projects = [
        m
      ]
    }

    console.log("loaded projects", projects);
  }, [])

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