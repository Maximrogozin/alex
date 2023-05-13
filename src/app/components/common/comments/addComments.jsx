import React, { useState, useEffect } from "react";
import SelectField from "../form/selectField";
import TextareaSelectedField from "../form/textareaSelectedField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import PropTypes from "prop-types";
const initial = { userId: "", content: "" };

const AddComments = ({ onSubmit }) => {
    const [data, setData] = useState(initial);
    const [errors, setErrors] = useState({ userId: "", content: "" });
    const [user, setUser] = useState([]);

    // мой валидатор для формы нового комментария
    const validatorConfig = {
        userId: {
            isRequared: {
                message: "Обязательно выберете пользователя"
            }
        },
        content: {
            isRequared: {
                message: "Обязательно напишите сообщение"
            }
        }
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const listOfUsers = Object.keys(data).map((userName) => ({
                value: data[userName]._id,
                label: data[userName].name
            }));
            setUser(listOfUsers);
        });
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const clearForm = () => {
        setData(initial);
        setErrors({});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data); // добавили data в ф-ю добавл нов. коммента
        clearForm();
    };
    console.log(data);

    return (
        <>
            <form onSubmit={submitHandler}>
                <h3 className="card-body">New comment</h3>
                <span className="card-body">
                    <SelectField
                        defaultOption="Выберете пользователя"
                        name="userId"
                        options={user}
                        onChange={handleChange}
                        value={data.userId}
                        error={errors.userId}
                    />
                    <TextareaSelectedField
                        type="text"
                        label="Сообщение"
                        name="content"
                        value={data.content}
                        onChange={handleChange}
                        error={errors.content}
                    />
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-primary text-white btn-outline-info "
                            // onClick={onSubmit}
                        >
                            Опубликовать
                        </button>
                    </div>
                </span>
            </form>
        </>
    );
};
AddComments.propTypes = {
    onSubmit: PropTypes.func
};

export default AddComments;
