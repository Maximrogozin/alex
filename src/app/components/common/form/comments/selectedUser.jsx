import React from "react";
import PropTypes from "prop-types";

const SelectedUser = ({ name, defaultValue, users }) => {
    return (
        <div className="mb-4">
            <select className="form-select" name={name} id="444">
                <option value="">{defaultValue}</option>
                {users &&
                    users.map((user) => (
                        <option value={user._id} key={user._id}>
                            {user.name}
                        </option>
                    ))}
            </select>
        </div>
    );
};
SelectedUser.propTypes = {
    name: PropTypes.string,
    defaultValue: PropTypes.string,
    users: PropTypes.array
};

export default SelectedUser;
