import React from "react";
import PropTypes from "prop-types";

const UsersSearch = ({ onChange, searchedUser }) => {
    return (
        <div>
            <input
                className="form-control "
                type="text"
                placeholder="Search..."
                onChange={onChange}
                value={searchedUser}
            />
        </div>
    );
};
UsersSearch.propTypes = {
    onChange: PropTypes.func,
    searchedUser: PropTypes.string
};

export default UsersSearch;
