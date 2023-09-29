import styles from "./display.module.css";

//const Display = () => {
const Display = ({ projects = [] }: any) => {

  console.log("projects loaded", projects);
  return (
      <div className={styles['column']}>
        {
          projects.map( (slug: any, id: any) => (
            <div key={id}>
              {slug}
            </div>
          ))
        } 
      </div>
  )
}

export default Display;