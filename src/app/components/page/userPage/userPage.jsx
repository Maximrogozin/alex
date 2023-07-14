import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import UserQualities from "../../ui/userQualities";
import UserCompletedMeetings from "../../ui/userCompletedMeetings";
import Comments from "../../ui/comments";
import { CommentsProvider } from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));
    console.log(user);

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
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
                    </div>
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
