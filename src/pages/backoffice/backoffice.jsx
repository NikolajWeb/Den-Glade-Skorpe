import { useEffect, useState } from "react";
import styles from "./backoffice.module.css";
import EmployeesSection from "./components/employeesSection/EmployeesSection";
import EmployeeForm from "./forms/EmployeeForm";

const Backoffice = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

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

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingEmployee(null);
    fetchEmployees();
  };

  return (
    <article className={styles.backoffice}>
      <h1>DASHBOARD</h1>

      <EmployeesSection
        employees={employees}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />

      {showModal && (
        <div className={styles.modal}>
          <EmployeeForm
            employee={editingEmployee}
            onClose={handleClose}
          />
        </div>
      )}
    </article>
  );
};

export default Backoffice;