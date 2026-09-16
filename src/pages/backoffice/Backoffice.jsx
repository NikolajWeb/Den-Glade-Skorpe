import { useEffect, useState } from "react";
import styles from "./backoffice.module.css";

import EmployeesSection from "./components/employeesSection/EmployeesSection";
import EmployeeForm from "./forms/employeesForms/EmployeeForm";
import backofficeLoader from "../../loaders/DataLoaders";

const Backoffice = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showEmployeeForm, setShowEmployeeForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const loadBackoffice = async () => {
            try {
                const result = await backofficeLoader();
                setData(result);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadBackoffice();
    }, []);

    const handleAddEmployee = () => {
        setSelectedEmployee(null);
        setShowEmployeeForm(true);
    };

    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowEmployeeForm(true);
    };

    const handleCloseEmployeeForm = () => {
        setSelectedEmployee(null);
        setShowEmployeeForm(false);
    };

    if (loading) {
        return <p>Henter backoffice...</p>;
    }

    if (error) {
        return <p>Der skete en fejl ved hentning af data.</p>;
    }

    return (
        <section className={styles.backofficeContainer}>
            <h1>Velkommen til backoffice</h1>

            <EmployeesSection
                employees={data?.employees || []}
                onAdd={handleAddEmployee}
                onEdit={handleEditEmployee}
            />

            {showEmployeeForm && (
                <EmployeeForm
                    employee={selectedEmployee}
                    onClose={handleCloseEmployeeForm}
                />
            )}
        </section>
    );
};

export default Backoffice;