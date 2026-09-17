import { useCrud } from "../../../../hooks/useCrud";
import styles from "./dishesSection.module.css";

const DishesSection = ({ dishes = [], onAdd, onEdit }) => {
  const { remove } = useCrud();

  const handleDelete = async (dish) => {
    const confirmed = window.confirm(
      `Er du sikker på, at du vil slette ${dish.title}?`
    );

    if (!confirmed) return;

    try {
      await remove("dish", dish._id);
    } catch (error) {
      console.error("Kunne ikke slette retten:", error);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Retter</h2>

        <button type="button" onClick={onAdd}>
          Tilføj ret
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Billede</th>
            <th>Ingredienser</th>
            <th>Kategori</th>
            <th>Pris</th>
            <th>Handlinger</th>
          </tr>
        </thead>

        <tbody>
          {dishes.map((dish) => (
            <tr key={dish._id}>
              <td>{dish.title}</td>

              <td>
                <img
                  src={dish.image}
                  alt={dish.title}
                  width="60"
                />
              </td>

              <td>
                {dish.ingredients?.join(", ")}
              </td>

              <td>{dish.category}</td>

              <td>
                {dish.price?.normal !== undefined && (
                  <div>Normal: {dish.price.normal} kr.</div>
                )}

                {dish.price?.family !== undefined && (
                  <div>Family: {dish.price.family} kr.</div>
                )}
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => onEdit(dish)}
                >
                  Rediger
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(dish)}
                >
                  Slet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {dishes.length === 0 && (
        <p>Der er ingen retter endnu.</p>
      )}
    </section>
  );
};

export default DishesSection;