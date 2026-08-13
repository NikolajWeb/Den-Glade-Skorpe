import styles from "./btn.module.css";

const Button = ({
    buttonText,
    type = "button",
    onClick,
    className = "",
}) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            type={type}
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
};

export default Button;