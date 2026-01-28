import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../../services/user';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile(localStorage.getItem("userId"));
        if (response) {
          const profileData = response.data;
          const userData = {
            firstName: profileData.firstname || '',
            lastName: profileData.lastname || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            addresses: profileData.address || []
          };
          setUser(userData);
          setEditedUser(userData);
          // Store in localStorage for consistency
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          setError('Failed to load profile data');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save updated user data to localStorage
    const updatedUser = { ...editedUser };
    localStorage.setItem('user', JSON.stringify(updatedUser));
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

  if (loading) {
    return (
      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="profile-card">
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="profile-card">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

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
              value={editedUser.firstname}
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
              value={editedUser.lastname}
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
                  {address.addressLine1}, {address.addressLine2}, {address.city},{address.district},{address.state}, {address.pincode}
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
