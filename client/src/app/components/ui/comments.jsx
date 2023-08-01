import React, { useEffect } from "react";
import _ from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/CommentsList";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import { nanoid } from "nanoid";
// import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    // const id = useSelector(getCurrentUserId());
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    const handleRemove = (id) => {
        dispatch(removeComment(id));
    };

    const handleSubmit = (data) => {
        dispatch(
            createComment({
                ...data,
                // _id: nanoid(),
                pageId: userId
                // created_at: Date.now(),
                // userId: id
            })
        );
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
