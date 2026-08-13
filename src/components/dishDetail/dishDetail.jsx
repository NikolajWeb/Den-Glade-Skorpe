import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Btn from "../Btn/Btn";
import styles from "./dishdetail.module.css";

const SIZES = [
    { value: "normal", label: "Almindelig" },
    { value: "family", label: "Familie" },
];

const DishDetail = () => {
    const { id } = useParams();
    const [dish, setDish] = useState(null);
    const [loading, setLoading] = useState(true);
    const [size, setSize] = useState("normal"); // standard = Almindelig
    const [added, setAdded] = useState(false);

    const fetchDish = async () => {
        try {
            const response = await fetch("http://localhost:3042/dishes");
            const data = await response.json();
            const foundDish = data.data.find((d) => d._id === id);
            setDish(foundDish || null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDish();
    }, [id]);

    const currentPrice = dish?.price ? dish.price[size] : null;

    const handleAddToCart = () => {
        console.log("Klikket på Tilføj til kurv");


        if (!dish || currentPrice == null) return;

        const cartItem = {
            id: dish._id,
            title: dish.title,
            image: dish.image || "",
            size,
            sizeLabel: SIZES.find((s) => s.value === size)?.label,
            price: currentPrice,
            quantity: 1,
        };

        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Hvis samme ret i samme størrelse allerede er i kurven, øg antal
        const existingIndex = existingCart.findIndex(
            (item) => item.id === cartItem.id && item.size === cartItem.size
        );

        if (existingIndex !== -1) {
            existingCart[existingIndex].quantity += 1;
        } else {
            existingCart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));

        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    if (loading) return <p>Indlæser...</p>;
    if (!dish) return <p>Retten blev ikke fundet.</p>;

    return (
        <section className={styles.dishDetail}>
            <img
                src={dish.image || ""}
                alt={dish.title}
                className={styles.image}
            />

            <div className={styles.infoCard}>
                <h1 className={styles.title}>{dish.title}</h1>

                {dish.ingredients && dish.ingredients.length > 0 && (
                    <ul className={styles.ingredientList}>
                        {dish.ingredients.map((ing, index) => (
                            <li key={index}>{ing}</li>
                        ))}
                    </ul>
                )}
            </div>

            {dish.price && (
                <div className={styles.sizeSection}>
                    <h2 className={styles.sizeHeading}>Vælg størrelse</h2>
                    <div className={styles.selectWrapper}>
                        <select
                            className={styles.sizeSelect}
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {SIZES.filter((s) => dish.price[s.value] != null).map(
                                (s) => (
                                    <option className={styles.option} key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </div>
            )}

            {currentPrice != null && (
                <div className={styles.priceSection}>
                    <p className={styles.priceLabel}>Pris</p>
                    <p className={styles.priceValue}>{currentPrice},-</p>
                </div>
            )}

            <Btn
                onClick={handleAddToCart}
                className={styles.addBtn}
                buttonText={added ? "Tilføjet! ✓" : `Tilføj ${dish.title} til kurven`}
            />
        </section>
    );
};

export default DishDetail;
