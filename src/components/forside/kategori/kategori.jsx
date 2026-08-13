import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./kategori.module.css";

const Kategori = () => {
    const [kategorier, setKategorier] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [selectedKategori, setSelectedKategori] = useState(null);
    const navigate = useNavigate();

    const fetchKategorier = async () => {
        try {
            const response = await fetch("http://localhost:3042/categories");
            const data = await response.json();
            setKategorier(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDishes = async () => {
        try {
            const response = await fetch("http://localhost:3042/dishes");
            const data = await response.json();
            setDishes(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchKategorier();
        fetchDishes();
    }, []);

    // Sæt "Pizza" som default-kategori, så den vises fra start
    useEffect(() => {
        if (kategorier.length > 0 && !selectedKategori) {
            const pizzaKategori = kategorier.find(
                (kat) => kat.name.toLowerCase() === "pizza"
            );
            setSelectedKategori(pizzaKategori || kategorier[0]);
        }
    }, [kategorier]);

    const filteredDishes = selectedKategori
        ? dishes.filter((dish) => dish.category === selectedKategori.name)
        : [];

    return (
        <section className={styles.kategori}>
            <h1 className={styles.title}>Vælg Kategori</h1>

            <div className={styles.KategoriMenu}>
                {kategorier.map((kat) => (
                    <div
                        key={kat._id}
                        className={styles.KategoriCard}
                        onClick={() => setSelectedKategori(kat)}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={kat.image || ""} alt={kat.name} />
                        <h2>{kat.name}</h2>
                    </div>
                ))}
            </div>

            {selectedKategori && (
                <div className={styles.categori}>
                    <h1 className={styles.title}>
                        Alle vores {selectedKategori.name}
                    </h1>

                    <div className={styles.cards}>
                        {filteredDishes.map((dish) => (
                            <div
                                key={dish._id}
                                className={styles.KategoriCard}
                                onClick={() => navigate(`/detaljeside/${dish._id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <img src={dish.image || ""} alt={dish.name} />
                                <h2>{dish.title}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Kategori;