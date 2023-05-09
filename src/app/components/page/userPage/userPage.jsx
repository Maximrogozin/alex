import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserCard from "../../ui/userCard";
import UserQualities from "../../ui/userQualities";
import UserCompletedMeetings from "../../ui/userCompletedMeetings";
import Comments from "../../common/comments/comments";
// import SelectedUser from "../../common/form/comments/selectedUser";
// import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    // const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    console.log(user);

    // const handleToUsers = () => {
    //     history.push("/users");
    // };

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <UserQualities user={user.qualities} />
                        <UserCompletedMeetings
                            numbers={user.completedMeetings}
                        />
                    </div>
                    <Comments />
                </div>
            </div>
        );
    }
    return (
        <div className="d-flex justify-content-center">
            <button className="btn btn-primary" type="button" disabled>
                <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                ></span>
                <span className="sr-only">Loading...</span>
            </button>
        </div>
    );
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
