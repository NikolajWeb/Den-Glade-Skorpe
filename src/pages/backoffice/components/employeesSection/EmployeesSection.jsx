import { useCrud } from "../../../../hooks/useCrud";
import styles from "./employeesSection.module.css";

const EmployeesSection = ({ employees = [], onAdd, onEdit }) => {
  const { remove } = useCrud();

  const handleDelete = async (employee) => {
    const confirmed = window.confirm(
      `Er du sikker på, at du vil slette ${employee.name}?`
    );

    if (!confirmed) return;

    try {
      await remove("employee", employee._id);
    } catch (error) {
      console.error("Kunne ikke slette medarbejderen:", error);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Personale</h2>

        <button type="button" onClick={onAdd}>
          Tilføj medarbejder
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Billede</th>
            <th>Position</th>
            <th>Handlinger</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>

              <td>
                <img
                  src={employee.image}
                  alt={employee.name}
                  width="60"
                />
              </td>

              <td>{employee.position}</td>

              <td>
                <button
                  type="button"
                  onClick={() => onEdit(employee)}
                >
                  Rediger
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(employee)}
                >
                  Slet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {employees.length === 0 && (
        <p>Der er ingen medarbejdere endnu.</p>
      )}
    </section>
  );
};

export default EmployeesSection;