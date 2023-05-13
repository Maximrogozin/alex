import React from "react";
import PropTypes from "prop-types";
import SingleComment from "./singleComment";

const ListOfComments = ({ comments, onRemove }) => {
    return comments.map((comment) => (
        <SingleComment key={comment._id} {...comment} onRemove={onRemove} />
    ));
};
ListOfComments.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
};

export default ListOfComments;
