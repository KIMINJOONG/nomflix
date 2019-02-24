import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TVPResenter = ({ topRated, popular, airingToday, loading, error }) => null;

TVPResenter.propTypes = {
    topRated: PropTypes.array, 
    popular: PropTypes.array, 
    airingToday: PropTypes.array, 
    loading: PropTypes.bool.isRequired, 
    error: PropTypes.string
};

export default TVPResenter;
