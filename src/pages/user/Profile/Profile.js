// src/pages/user/Profile/Profile.js
import React, { useState, useEffect } from 'react';
import './Profile.css';
import { fetchUserProfile } from '../../../services/userServices';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchUserProfile();
        // Pastikan ambil data sesuai structure BE
        const formatted = {
          namaLengkap: data?.name || '',
          namaPengguna: data?.username || data?.name || '',
          email: data?.email || '',
          kataSandi: '••••••••',
          foto: data?.avatar || 'profile-picture.jpg',
        };
        setProfileData(formatted);
        setFormData(formatted);
        setRole(data?.role || 'user');
      } catch (err) {
        console.error('Gagal fetch profil', err);
        setError('Gagal memuat profil');
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading profil...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  if (!profileData) return null;

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        {/* Kiri - Foto Profil */}
        <div className="profile-left">
          <img
            src={profileData.foto}
            alt={profileData.namaLengkap}
            className="profile-avatar"
          />
          {isEditing && <button className="edit-icon">✎</button>}
        </div>

        {/* Kanan - Form Profil */}
        <div className="profile-right">
          <h2 className="profile-section-title">
            Profil {role === 'admin' ? 'Admin' : 'User'}
          </h2>

          <div className="profile-grid">
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Nama Pengguna</label>
              <input
                type="text"
                name="namaPengguna"
                value={formData.namaPengguna}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Kata Sandi</label>
              <input
                type="password"
                name="kataSandi"
                value={formData.kataSandi}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div className="profile-footer">
            {isEditing ? (
              <>
                <button className="btn-cancel" onClick={handleCancel}>
                  Batal
                </button>
                <button className="btn-save" onClick={handleSave}>
                  Simpan
                </button>
              </>
            ) : (
              <button className="btn-edit" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
