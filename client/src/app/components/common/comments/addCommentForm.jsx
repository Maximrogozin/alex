import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import TextareaSelectedField from "../form/textareaSelectedField";

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({ userId: "", content: "" });

    const validatorConfig = {
        content: {
            isRequared: {
                message: "Сообщение не может быть пустым"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <>
            <form onSubmit={submitHandler}>
                <h3 className="card-body">New comment</h3>
                <span className="card-body">
                    <TextareaSelectedField
                        type="text"
                        label="Сообщение"
                        name="content"
                        value={data.content || ""}
                        onChange={handleChange}
                        error={errors.content}
                    />
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-info text-dark btn-outline-info"
                            disabled={!isValid}
                        >
                            Опубликовать
                        </button>
                    </div>
                </span>
            </form>
        </>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
