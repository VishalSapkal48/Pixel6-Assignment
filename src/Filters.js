import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const predefinedCountries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'India', 'China', 'Japan', 'South Korea'
];

const Filters = ({ onChange }) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    onChange({ gender: selectedGender, country });
  }, [selectedGender, country, onChange]);

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="filters">
   <h1>Employees</h1>
     <div className="inputtext">
    
      <select value={selectedGender} onChange={handleGenderChange}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="transgender">Transgender</option>
      </select>

  
      <select value={country} onChange={handleCountryChange}>
        <option value="">Country</option>
        {predefinedCountries.map((countryName) => (
          <option key={countryName} value={countryName}>{countryName}</option>
        ))}
      </select>
      </div>
    </div>
  );
};

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filters;
