import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./KontaktForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../btn/btn";

import xIcon from "/src/assets/x_icon.svg";
import PizzaBG from "/src/assets/ananas.png";


const KontaktForm = () => {
    const schema = yup.object().shape({
        name: yup.string().required("Navn er påkrævet"),
        subject: yup.string().required("Emne er påkrævet"),
        message: yup.string().min(10, "Besked skal være mindst 10 tegn").required("Besked er påkrævet"),
    });

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
        useForm({ resolver: yupResolver(schema) });

    const [popup, setPopup] = useState({
        show: false,
        type: "",
        name: ""
    });

    const onSubmit = async (data) => {
        const cleanData = {
            name: data.name,
            subject: data.subject,
            description: data.message,
        };

        try {
            const response = await fetch("http://localhost:3042/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanData),
            });

            const result = await response.json();

            console.log("STATUS:", response.status);
            console.log("DATA SENDT:", cleanData);
            console.log("SERVER RESPONSE:", result);

            if (!response.ok) throw new Error("Serverfejl");

            setPopup({
                show: true,
                type: "success",
                name: data.name
            });

            reset();

        } catch (error) {
            console.log("Fejl:", error);
        }
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <label>Navn</label>
                <input type="text" {...register("name")} />
                {errors.name && (
                    <span className={styles.error}>{errors.name.message}</span>
                )}

                <label>Emne</label>
                <input type="text" {...register("subject")} />
                {errors.subject && (
                    <span className={styles.error}>{errors.subject.message}</span>
                )}

                <label>Beskrivelse</label>
                <textarea rows="5" {...register("message")} />
                {errors.message && (
                    <span className={styles.error}>{errors.message.message}</span>
                )}

                <Button
                    buttonText={isSubmitting ? "Sender..." : "Send"}
                    type="submit"
                />
            </form>

            {popup.show && (
                <div className={`${styles.popup} ${styles[popup.type]}`}>
                    <div className={styles.card}>
                        <img src={PizzaBG} alt="BG pizza" className={styles.bg} />
                        <div className={styles.content}>
                            <p>Tak for din besked {popup.name}!</p>
                            <p>Vi vender tilbage hurtigst muligt.</p>
                        </div>
                        <img
                            src={xIcon}
                            className={styles.close}
                            onClick={() => setPopup({ ...popup, show: false })}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default KontaktForm;