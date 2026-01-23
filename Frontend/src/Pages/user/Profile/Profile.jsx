import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addresses: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    // Load user data from sessionStorage
    const storedUser = JSON.parse(sessionStorage.getItem('user')) || {};
    setUser({
      firstName: storedUser.firstName || '',
      lastName: storedUser.lastName || '',
      email: storedUser.email || '',
      phone: storedUser.phone || '',
      addresses: storedUser.addresses || []
    });
    setEditedUser({
      firstName: storedUser.firstName || '',
      lastName: storedUser.lastName || '',
      email: storedUser.email || '',
      phone: storedUser.phone || '',
      addresses: storedUser.addresses || []
    });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save updated user data to sessionStorage
    const updatedUser = { ...editedUser };
    sessionStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="profile-field">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              disabled
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>
        <div className="profile-field">
          <label>First Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          ) : (
            <span>{user.firstName || 'Not provided'}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Last Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          ) : (
            <span>{user.lastName || 'Not provided'}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={editedUser.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          ) : (
            <span>{user.phone || 'Not provided'}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Addresses:</label>
          <div className="addresses-list">
            {user.addresses.length > 0 ? (
              user.addresses.map((address, index) => (
                <div key={index} className="address-item">
                  {address.street}, {address.city}, {address.state}, {address.zip}
                </div>
              ))
            ) : (
              <span>No addresses added</span>
            )}
          </div>
          <button className="add-address-btn" onClick={() => navigate('/add-address')}>
            Add New Address
          </button>
        </div>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEdit}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
