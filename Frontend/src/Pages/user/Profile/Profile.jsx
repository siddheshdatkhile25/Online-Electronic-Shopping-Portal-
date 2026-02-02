import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../../services/user';
import api from '../../../api/axiosInstance';
import { toast } from 'react-toastify';
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
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
          setError('User not logged in');
          setLoading(false);
          return;
        }
        
        const profileData = await getUserProfile(userId);
        
        console.log("Profile data received:", profileData);
        
        if (profileData) {
          const userData = {
            firstName: profileData.firstname || '',
            lastName: profileData.lastname || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            addresses: Array.isArray(profileData.addresses) ? profileData.addresses : []
          };
          
          console.log("User data after mapping:", userData);
          console.log("Addresses:", userData.addresses);
          
          setUser(userData);
          setEditedUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          setError('Failed to load profile data');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data: ' + err.message);
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
    const updatedUser = { ...editedUser };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
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

  const getInitials = () => {
    const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || '';
    const lastInitial = user.lastName?.charAt(0)?.toUpperCase() || '';
    return firstInitial + lastInitial || 'U';
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">{getInitials()}</div>
          </div>
          <div className="profile-header-info">
            <h1>{user.firstName || user.lastName ? `${user.firstName} ${user.lastName}` : 'Welcome'}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
          <div className="profile-header-actions">
            {!isEditing && (
              <button className="edit-btn" onClick={handleEdit}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {/* Personal Information Card */}
          <div className="profile-card">
            <div className="card-header">
              <h2>Personal Information</h2>
              <p className="card-subtitle">Manage your personal details</p>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={editedUser.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{user.firstName || 'Not provided'}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={editedUser.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{user.lastName || 'Not provided'}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleChange}
                      disabled
                      className="form-input disabled"
                    />
                  ) : (
                    <p className="form-value">{user.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{user.phone || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button className="btn-save" onClick={handleSave}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Save Changes
                  </button>
                  <button className="btn-cancel" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Addresses Card */}
          <div className="profile-card">
            <div className="card-header">
              <div>
                <h2>Saved Addresses</h2>
                <p className="card-subtitle">Manage your delivery addresses</p>
              </div>
              <button className="btn-add-address" onClick={() => navigate('/add-address')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add New Address
              </button>
            </div>
            <div className="card-body">
              {user.addresses && Array.isArray(user.addresses) && user.addresses.length > 0 ? (
                <div className="addresses-grid">
                  {user.addresses.map((address, index) => (
                    <div key={index} className="address-card">
                      <div className="address-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <div className="address-content">
                        <h4>Address {index + 1}</h4>
                        <p>
                          {address.addressLine1}
                          {address.addressLine2 && `, ${address.addressLine2}`}
                        </p>
                        <p>
                          {address.city}, {address.district}
                        </p>
                        <p>
                          {address.state} - {address.pincode}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <h3>No addresses added yet</h3>
                  <p>Add your first delivery address to get started</p>
                  <button className="btn-add-first" onClick={() => navigate('/add-address')}>
                    Add Your First Address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;