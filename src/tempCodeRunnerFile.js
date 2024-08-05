import React from 'react';
import PropTypes from 'prop-types';

const SortOptions = ({ onChange }) => {
  const handleSortChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="sort-options">
      <label>Sort By: </label>
      <select onChange={handleSortChange}>
        <option value="">None</option>
        <option value="id">ID</option>
        <option value="name">Name</option>
        <option value="age">Age</option>
      </select>
    </div>
  );
};

SortOptions.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SortOptions;
