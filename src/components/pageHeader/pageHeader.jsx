import styles from "./pageHeader.module.css";
import bgImg from "../../assets/headerImg.png"

const PageHeader = () => {


  return (
    <header className={styles.container}>
        <div className={styles.bg}>
          <img src={bgImg} alt="" className={styles.bgImg} />
          <h1 className={styles.bgText}>
            <span className={styles.title1}>Den</span>
            <span className={styles.title2}>Glade</span>
            <span className={styles.title3}>Skorpe</span>
          </h1>
        </div>
    </header>
  );
};

export default PageHeader;