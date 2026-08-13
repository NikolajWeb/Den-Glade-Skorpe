import { useEffect, useState } from "react";
import styles from "./kurv.module.css";
import Btn from "../btn/btn";

const Kurv = () => {
    const [cart, setCart] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <article className={styles.wrapper}>
            
            <div className={styles.order}>
                {cart.length === 0 ? (
                    <p className={styles.empty}>Kurven er tom.</p>
                ) : (
                    cart.map((item) => (
                        <div
                            key={`${item.id}-${item.size}`}
                            className={styles.cartItem}
                        >
                            <div className={styles.cartItemHeader}>
                                <span className={styles.quantity}>
                                    {item.quantity} X
                                </span>
                                <img
                                    className={styles.itemImage}
                                    src={item.image}
                                    alt={item.title}
                                />
                                <span className={styles.itemTitle}>
                                    {item.title}
                                </span>
                            </div>

                            {item.extra && (
                                <div className={styles.row}>
                                    <span className={styles.label}>
                                        Ekstra:
                                    </span>
                                    <span className={styles.value}>
                                        {item.extra}
                                    </span>
                                </div>
                            )}

                            {item.sizeLabel && (
                                <div className={styles.row}>
                                    <span className={styles.label}>
                                        Størrelse:
                                    </span>
                                    <span className={styles.value}>
                                        {item.sizeLabel}
                                    </span>
                                </div>
                            )}

                            <div className={styles.row}>
                                <span className={styles.label}>Pris:</span>
                                <span className={styles.value}>
                                    {item.price},-
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className={styles.totalRow}>
                <span className={styles.totalLabel}>I alt:</span>
                <span className={styles.totalValue}>{total},-</span>
            </div>

            <textarea
                className={styles.comment}
                placeholder="Kommentarer til ordren"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <Btn buttonText="Afgiv ordre" />
        </article>
    );
};

export default Kurv;
