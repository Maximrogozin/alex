import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
const BookMark = () => {
    const [status, setStatus] = useState(() => {
        const localData = localStorage.getItem("status");
        return localData ? JSON.parse(localData) : false;
    });

    useEffect(() => {
        localStorage.setItem("status", JSON.stringify(status));
    }, [status]);

    return (
        <button onClick={() => setStatus(!status)}>
            <i className={"bi bi-bookmark" + (status ? "-star-fill" : "")}></i>
        </button>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool
};

export default BookMark;
