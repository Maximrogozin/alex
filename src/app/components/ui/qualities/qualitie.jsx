import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ _id: id }) => {
    const { getQualities } = useQualities();
    const { name, color } = getQualities(id);
    return <span className={"badge m-1 bg-" + color}>{name}</span>;
};
Qualitie.propTypes = {
    _id: PropTypes.string.isRequired
};

export default Qualitie;
