import styles from "./pageFooter.module.css";
import logo from "../../assets/logo.png";


const PageFooter = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="" />     
            </div>

            <div className={styles.footerInfo}>
                <p>Email: gladskorpe@pizzaglad.dk</p>
                <p>Tlf: 12345678</p>
                <p>Adresse: Skorpevej 42, 1234 Pizzabyen</p>
            </div>
        </footer>
    );
};

export default PageFooter;