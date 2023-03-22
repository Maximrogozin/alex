import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleToUsers = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <div className="m-3">
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <div>
                    {user.qualities.map((qual) => (
                        <span
                            key={qual._id}
                            className={`badge m-1 bg-${qual.color}`}
                        >
                            {qual.name}
                        </span>
                    ))}
                </div>
                <div>completedMeetings: {user.completedMeetings}</div>

                <h2>Rate: {user.rate}</h2>
                <button onClick={handleToUsers} className="btn btn-warning">
                    Все пользователи
                </button>
            </div>
        );
    }
    return <h1>Loading...</h1>;
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
