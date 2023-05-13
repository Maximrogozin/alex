import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "..//../../api";
import { getDayFormat } from "../../../utils/displayDate";

const SingleComment = ({
    content,
    userId,
    _id,
    created_at: time,
    onRemove
}) => {
    const [user, setUser] = useState();

    // кто написал этот комментарий ->
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user && user.name}
                                        <span className="small">
                                            {" - "}
                                            {getDayFormat(time)}
                                        </span>
                                    </p>
                                    <button
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={() => onRemove(_id)}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
SingleComment.propTypes = {
    content: PropTypes.string,
    userId: PropTypes.string,
    created_at: PropTypes.number,
    onRemove: PropTypes.func,
    _id: PropTypes.string
};

export default SingleComment;
