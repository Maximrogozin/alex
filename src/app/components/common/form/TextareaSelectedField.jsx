import React from "react";
import PropTypes from "prop-types";

const TextareaSelectedField = ({ label, type, name, value, onChange }) => {
    // const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className="form-control"
                ></textarea>
            </div>
        </div>
    );
};
TextareaSelectedField.defaultProps = {
    type: "text"
};
TextareaSelectedField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    rows: PropTypes.string
};

export default TextareaSelectedField;
