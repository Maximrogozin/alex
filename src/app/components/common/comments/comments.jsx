import React, { useState, useEffect } from "react";
import SelectField from "../form/selectField";
import TextareaSelectedField from "../form/TextareaSelectedField";
import api from "../../../api";

const Comments = () => {
    const [data, setData] = useState({ user: "", message: "" });
    const [user, setUser] = useState();
    console.log(user);

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const listOfUsers = Object.keys(data).map((userName) => ({
                value: data[userName]._id,
                label: data[userName].name
            }));
            setUser(listOfUsers);
        });
    }, []);

    console.log(user);
    console.log(data.user);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    return (
        <div className="col-md-8">
            <div className="card mb-2">
                <h3 className="card-body">New comment</h3>
                <span className="card-body">
                    <SelectField
                        defaultOption="Выберете пользователя"
                        name="user"
                        options={user}
                        onChange={handleChange}
                        value={data.user}
                    />
                    <TextareaSelectedField
                        type="text"
                        label="Сообщение"
                        name="message"
                        value={data.email}
                        onChange={handleChange}
                    />
                </span>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    comments
                </div>
            </div>
        </div>
    );
};

export default Comments;
