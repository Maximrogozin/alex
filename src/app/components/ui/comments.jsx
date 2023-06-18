import React from "react";
import _ from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/CommentsList";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { createComment, comments, removeComment } = useComments();
    const handleRemove = (id) => {
        removeComment(id);
        // api.comments
        //     .remove(id)
        //     .then((id) =>
        //         setComments(comments.filter((comment) => comment._id !== id))
        //     );
    };

    // добавляем новый коммент от нового юзера
    const handleSubmit = (data) => {
        createComment(data);
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
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
                        <CommentsList
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
