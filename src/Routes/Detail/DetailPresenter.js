import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DetailPResenter = ({ result, loading, error }) => null;

DetailPResenter.propTypes = {
    result: PropTypes.object, 
    loading: PropTypes.bool.isRequired, 
    error: PropTypes.string
};

export default DetailPResenter;
