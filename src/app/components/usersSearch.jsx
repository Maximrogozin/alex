import React from "react";
import PropTypes from "prop-types";

const UsersSearch = ({ onChange }) => {
    return (
        <div>
            <input
                className="form-control "
                type="text"
                placeholder="Search..."
                onChange={onChange}
            />
        </div>
    );
};
UsersSearch.propTypes = {
    onChange: PropTypes.func
};

export default UsersSearch;
