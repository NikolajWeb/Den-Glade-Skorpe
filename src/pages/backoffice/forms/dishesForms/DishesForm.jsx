import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCrud } from "../../../../hooks/useCrud";
import styles from "../form.module.css";

const schema = yup.object({
  title: yup.string().required("Navn er påkrævet"),

  ingredients: yup
    .string()
    .required("Ingredienser er påkrævet"),

  category: yup
    .string()
    .required("Kategori er påkrævet"),

  normalPrice: yup
    .number()
    .typeError("Normal pris skal være et tal")
    .required("Normal pris er påkrævet")
    .min(0, "Prisen må ikke være negativ"),

  familyPrice: yup
    .number()
    .typeError("Family pris skal være et tal")
    .min(0, "Prisen må ikke være negativ"),

  image: yup.mixed(),
});

const DishForm = ({ dish, onClose }) => {
  const { create, update } = useCrud();

  const isEditing = !!dish;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      ingredients: "",
      category: "",
      normalPrice: "",
      familyPrice: "",
    },
  });

  useEffect(() => {
    if (dish) {
      reset({
        title: dish.title || "",

        ingredients: Array.isArray(dish.ingredients)
          ? dish.ingredients.join(", ")
          : dish.ingredients || "",

        category: dish.category || "",

        normalPrice: dish.price?.normal ?? "",
        familyPrice: dish.price?.family ?? "",
      });
    } else {
      reset({
        title: "",
        ingredients: "",
        category: "",
        normalPrice: "",
        familyPrice: "",
      });
    }
  }, [dish, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);

    // "Tomat, Ost, Skinke"
    // bliver til flere "ingredients"-felter
    const ingredients = data.ingredients
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter(Boolean);

    ingredients.forEach((ingredient) => {
      formData.append("ingredients", ingredient);
    });

    formData.append("category", data.category);

    formData.append(
      "price",
      JSON.stringify({
        normal: Number(data.normalPrice),
        ...(data.familyPrice !== ""
          ? {
            family: Number(data.familyPrice),
          }
          : {}),
      })
    );

    if (data.image && data.image.length > 0) {
      formData.append("file", data.image[0]);
    }

    try {
      if (isEditing) {
        formData.append("id", dish._id);

        console.log("EDIT DISH:", dish);
        console.log("DISH ID:", dish._id);
        console.log(
          "FORM DATA:",
          [...formData.entries()]
        );

        await update("dish", formData);
      } else {
        console.log(
          "CREATE DISH FORM DATA:",
          [...formData.entries()]
        );

        await create("dish", formData);
      }

      onClose();
    } catch (error) {
      console.error(
        isEditing
          ? "Kunne ikke redigere retten:"
          : "Kunne ikke oprette retten:",
        error
      );
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <h2>
          {isEditing ? "Rediger ret" : "Opret ret"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Navn</label>

            <input
              id="title"
              type="text"
              {...register("title")}
            />

            {errors.title && (
              <p className={styles.error}>
                {errors.title.message}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ingredients">
              Ingredienser
            </label>

            <input
              id="ingredients"
              type="text"
              placeholder="Fx Tomat, Ost, Skinke"
              {...register("ingredients")}
            />

            {errors.ingredients && (
              <p className={styles.error}>
                {errors.ingredients.message}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">
              Kategori
            </label>

            <input
              id="category"
              type="text"
              placeholder="Fx Pizza"
              {...register("category")}
            />

            {errors.category && (
              <p className={styles.error}>
                {errors.category.message}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="normalPrice">
              Normal pris
            </label>

            <input
              id="normalPrice"
              type="number"
              min="0"
              step="0.01"
              {...register("normalPrice")}
            />

            {errors.normalPrice && (
              <p className={styles.error}>
                {errors.normalPrice.message}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="familyPrice">
              Family pris
            </label>

            <input
              id="familyPrice"
              type="number"
              min="0"
              step="0.01"
              {...register("familyPrice")}
            />

            {errors.familyPrice && (
              <p className={styles.error}>
                {errors.familyPrice.message}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">
              Billede
              {isEditing &&
                " (lad være tom hvis billedet ikke skal ændres)"}
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
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
                : "Opret ret"}
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Annuller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DishForm;

