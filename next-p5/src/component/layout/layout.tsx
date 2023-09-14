import styles from "./layout.module.css";

const Layout = ( {children}: any ) => {
    return (
        <div className={styles.layout}>
          {children.map((child: any, idx: number) => (
            <div className={styles.flexcolumn} key={idx}>
                {child}
            </div>
          ))}
        </div>
    )
}

export default Layout;