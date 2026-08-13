import styles from "./infoSection.module.css";

const InfoSection = ({title, info}) => {
  return (
    <section className={styles.infoSection}>
      <h1>
        {title}
      </h1>

      <p>
        {info}
      </p>
    </section>
  );
};

export default InfoSection;