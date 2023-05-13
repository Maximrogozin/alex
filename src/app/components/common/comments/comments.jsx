import React, { useEffect, useState } from "react";
import AddComments from "./addComments";
import ListOfComments from "./listOfComments";
import api from "../../../api";
import { useParams } from "react-router-dom";
import _ from "lodash";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleRemove = (id) => {
        api.comments
            .remove(id)
            .then((id) =>
                setComments(comments.filter((comment) => comment._id !== id))
            );
    };

    // добавляем новый коммент от нового юзера
    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <div className="col-md-8">
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddComments onSubmit={handleSubmit} />
                </div>
            </div>
            {comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <ListOfComments
                            comments={sortedComments}
                            onRemove={handleRemove}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comments;
