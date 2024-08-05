import React from 'react';
import PropTypes from 'prop-types';

const SortOptions = ({ onChange }) => {
  const handleSortChange = (e) => {
    onChange(e.target.value);
  };
};

SortOptions.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SortOptions;
