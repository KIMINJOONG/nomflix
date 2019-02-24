import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const HomePResenter = ({ nowPlaying, popular, upcoming, loading, error }) => null;

HomePResenter.propTypes = {
    nowPlaying: PropTypes.array, 
    popular: PropTypes.array, 
    upcoming: PropTypes.array, 
    loading: PropTypes.bool.isRequired, 
    error: PropTypes.string
};

export default HomePResenter;
