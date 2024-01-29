import "./Input.module.scss";
const Input = ({
    type = "text",
    customClass,
    value,
    onChange,
    placeholder,
    ...props
}) => {
    return (
        <input
            type={type}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={customClass && customClass}
            placeholder={placeholder || ""}
            {...props}
        />
    );
};
export default Input;
