import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getPeofessionsLoadingStatus,
    getProfessionsByIds,
    loadProfessionsList
} from "../../store/professions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);

    const isLoading = useSelector(getPeofessionsLoadingStatus);
    if (isLoading) return "loading ...";

    // const professionList = useSelector(getProfessionsByIds(id));
    const professionList = useSelector((state) =>
        getProfessionsByIds(id)(state)
    );
    console.log(professionList);

    return <p>{professionList.name}</p>;
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
