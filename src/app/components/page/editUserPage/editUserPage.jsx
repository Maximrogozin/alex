import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import BackHistoryButton from "../../common/BackButton";
// import { useUser } from "../../../hooks/useUsers";
// import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "..//..//../store/qualities";
import { getProfessions } from "../../../store/professions";
import { getCurrentUserData, updateUser } from "../../../store/users";

const EditUserPage = ({ userId }) => {
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getQualitiesLoadingStatus());
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    // const { getUserById } = useUser();
    // const { updateUserData } = useAuth();
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    // const user = getUserById(userId);
    const user = useSelector(getCurrentUserData());
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    function transformData(data) {
        return data.map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
    }

    function getQualities1(elements) {
        const qualitiesArray = [];
        for (const qualId of elements) {
            // элементы наших id массива качест этого юзера
            for (const quality of qualities) {
                // перебираем качества из общ мас качеств
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                }
            }
        }
        return qualitiesArray;
    }

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && user) {
            setLoading(false);
        }
    }, [professionsLoading, qualitiesLoading, user]);

    useEffect(() => {
        setData({
            ...user,
            qualities: transformData(getQualities1(user.qualities))
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequared: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequared: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        profession: {
            isRequared: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        // qualities: {
        //     isRequared: {
        //         message: "Обязательно выберите ваши качества"
        //     }
        // },
        licence: {
            isRequared: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            updateUser({
                ...data,
                qualities: data.qualities.map((qual) => qual.value)
            })
        );
        // history.goBack();
        history.push(`/users/${currentUser._id}`);
    };

    return (
        <>
            {/* <div className="mx-5 mr-5"></div> */}
            {!loading && professions.length > 0 ? (
                <div className="container mt-5 ">
                    <BackHistoryButton />
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />

                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    name="profession"
                                    options={professionsList}
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    options={transformData(qualities)}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto mb-2"
                                >
                                    Обновить данные
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center">
                    <div
                        className="spinner-border m-5 text-primary"
                        role="status"
                    >
                        <span className="sr-only"></span>
                    </div>
                </div>
            )}
        </>
    );
};
EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default EditUserPage;
