import React, { useEffect } from "react";
import _ from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/CommentsList";
import { useComments } from "../../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from "../../store/comments";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());

    const comments = useSelector(getComments());

    const { createComment, removeComment } = useComments();
    const handleRemove = (id) => {
        removeComment(id);
    };

    // добавляем новый коммент от нового юзера
    const handleSubmit = (data) => {
        createComment(data);
    };
    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <div>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemove}
                            />
                        ) : (
                            "Loading ..."
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comments;
