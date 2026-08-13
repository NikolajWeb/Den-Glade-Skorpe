import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCrud } from "../../../hooks/useCrud";
import styles from "./form.module.css";

const schema = yup.object({
  name: yup.string().required("Navn er påkrævet"),
  position: yup.string().required("Position er påkrævet"),
  image: yup.mixed().nullable(),
});

const EmployeeEditForm = ({ employee, onClose }) => {
  const { update } = useCrud();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: employee.name,
      position: employee.position,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("id", employee._id);
    formData.append("name", data.name);
    formData.append("position", data.position);

    if (data.image && data.image.length > 0) {
      formData.append("file", data.image[0]);
    }

    try {
      await update("employee", formData);
      onClose();
    } catch (error) {
      console.error("Kunne ikke redigere medarbejderen:", error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <h2>Rediger medarbejder</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Navn</label>
            <input id="name" type="text" {...register("name")} />

            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="position">Position</label>
            <input id="position" type="text" {...register("position")} />

            {errors.position && (
              <p className={styles.error}>{errors.position.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Nyt billede</label>
            <input id="image" type="file" {...register("image")} />

            {errors.image && (
              <p className={styles.error}>{errors.image.message}</p>
            )}
          </div>

          <div className={styles.buttons}>
            <button type="submit">Gem ændringer</button>

            <button type="button" onClick={onClose}>
              Annuller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEditForm;