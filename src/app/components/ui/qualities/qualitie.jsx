import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Qualitie = ({ _id: id }) => {
    const { getQuality } = useQuality();
    const { name, color } = getQuality(id);
    return <span className={"badge m-1 bg-" + color}>{name}</span>;
};
Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default Qualitie;
