function InputBox({ type, label, id, value, onChange, placeholder, required = false }) {
    return (
        <div className="input-box">
            <label htmlFor={id}>{label} {required && <span className="asterisk"> *</span>}</label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}

export default InputBox;
