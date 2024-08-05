import React from 'react';
import PropTypes from 'prop-types';

const UserTable = ({ users, onSort, sortConfig }) => {
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleSort = (key) => {
    onSort(key);
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('id')} className={getClassNamesFor('id')}>ID</th>
          <th>Image</th>
          <th onClick={() => handleSort('name')} className={getClassNamesFor('name')}>Name</th>
          <th onClick={() => handleSort('age')} className={getClassNamesFor('age')}>Age</th>
          <th>Demography</th>
          <th>Designation</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td><img src={user.image} alt={`${user.firstName} ${user.lastName}`} style={{ width: '50px', height: '50px' }} /></td>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.company.department}</td>
            <td>{user.address.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.object.isRequired,
};

export default UserTable;
