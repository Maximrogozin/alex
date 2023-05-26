import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

const QualitiesList = ({ qualities }) => {
    console.log(qualities);

    return (
        <>
            {qualities.map((qual) => (
                // <Qualitie {...qual} key={qual._id} _id={qual} />
                <Qualitie key={qual._id} _id={qual} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
