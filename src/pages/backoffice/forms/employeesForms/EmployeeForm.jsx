import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCrud } from "../../../../hooks/useCrud";
import styles from "../form.module.css";

const schema = yup.object({
  name: yup.string().required("Navn er påkrævet"),
  position: yup.string().required("Position er påkrævet"),
  image: yup.mixed(),
});

const EmployeeForm = ({ employee, onClose }) => {
  const { create, update } = useCrud();

  const isEditing = !!employee;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      position: "",
    },
  });

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        position: employee.position,
      });
    } else {
      reset({
        name: "",
        position: "",
      });
    }
  }, [employee, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("position", data.position);

    if (data.image && data.image.length > 0) {
      formData.append("file", data.image[0]);
    }

    try {
      if (isEditing) {
        formData.append("id", employee._id);

        console.log("EDIT EMPLOYEE:", employee);
        console.log("EMPLOYEE ID:", employee._id);
        console.log("FORM DATA:", [...formData.entries()]);

        await update("employee", formData);
      } else {
        await create("employee", formData);
      }

      onClose();
    } catch (error) {
      console.error(
        isEditing
          ? "Kunne ikke redigere medarbejder:"
          : "Kunne ikke oprette medarbejder:",
        error
      );
    }
  };

  
  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <h2>
          {isEditing ? "Rediger medarbejder" : "Opret medarbejder"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Navn</label>

            <input
              id="name"
              type="text"
              {...register("name")}
            />

            {errors.name && (
              <p className={styles.error}>
                {errors.name.message}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="position">Position</label>

            <input
              id="position"
              type="text"
              {...register("position")}
            />

            {errors.position && (
              <p className={styles.error}>
                {errors.position.message}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">
              Billede
              {isEditing && " (lad være tom hvis billedet ikke skal ændres)"}
            </label>

            <input
              id="image"
              type="file"
              {...register("image")}
            />

            {errors.image && (
              <p className={styles.error}>
                {errors.image.message}
              </p>
            )}
          </div>

          <div className={styles.buttons}>
            <button type="submit">
              {isEditing
                ? "Gem ændringer"
                : "Opret medarbejder"}
            </button>

            <button type="button" onClick={onClose}>
              Annuller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;