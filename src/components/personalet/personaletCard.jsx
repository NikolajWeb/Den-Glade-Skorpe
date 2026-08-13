import { useEffect, useState } from "react";
import styles from "./personaletCard.module.css";

const PersonaleCard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3042/employees");
      const data = await response.json();

      console.log(data);

      setEmployees(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.info}>
      {employees.map((employee) => (
        <div key={employee._id} className={styles.card}>
          <img
            src={employee.image}
            alt={employee.name}
            className={styles.cardImg}
          />
          <h1 className={styles.name}>{employee.name}</h1>
          <h2 className={styles.role}>{employee.position}</h2>
        </div>
      ))}
    </section>
  );
};

export default PersonaleCard;