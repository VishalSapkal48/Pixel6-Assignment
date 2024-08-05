import React from 'react';
import PropTypes from 'prop-types';

const UserCard = ({ user }) => (
  <div className="user-card">
    <img src={user.image} alt={`${user.firstName} ${user.lastName}`} style={{ width: '100px', height: '100px' }} />
    <p>ID: {user.id}</p>
    <p>Name: {user.firstName} {user.lastName}</p>
    <p>Age: {user.age}</p>
    <p>Gender: {user.gender}</p>
    <p>Country: {user.address.country}</p>
    <p>Designation: {user.designation}</p>
  </div>
);

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCard;
