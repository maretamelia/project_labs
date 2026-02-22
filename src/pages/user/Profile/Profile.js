// src/pages/user/Profile/Profile.js
import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import { fetchUserProfile, updateUserProfile } from '../../../services/userServices';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [role, setRole] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const imageInputRef = useRef(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchUserProfile();

        // Pastikan ambil data sesuai structure BE
        const formatted = {
          namaLengkap: data?.name || '',
          email: data?.email || '',
          kataSandi: '',
          kataSandiKonfirmasi: '',
          foto: data?.image ? `http://localhost:8000/storage/${data?.image}` : 'profile-picture.jpg',
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

  const handleEdit = () => {
    setIsEditing(true);
    setSuccessMessage('');
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError('');
      setSuccessMessage('');

      // Validasi password confirmation
      if (formData.kataSandi && formData.kataSandi.trim()) {
        if (formData.kataSandi !== formData.kataSandiKonfirmasi) {
          setError('Password dan konfirmasi password tidak cocok');
          setIsSaving(false);
          return;
        }
      }

      const updateData = {
        name: formData.namaLengkap,
        email: formData.email,
      };

      // Tambah password hanya jika ada input
      if (formData.kataSandi && formData.kataSandi.trim()) {
        updateData.password = formData.kataSandi;
      }

      if (formData.kataSandiKonfirmasi && formData.kataSandiKonfirmasi.trim()) {
        updateData.password_confirmation = formData.kataSandiKonfirmasi;
      }

      // Tambah image hanya jika ada file baru
      if (imageFile) {
        updateData.image = imageFile;
      }

      const result = await updateUserProfile(updateData);

      // Update profile data dengan response dari server
      const updatedData = {
        namaLengkap: result.name || formData.namaLengkap,
        email: result.email || formData.email,
        kataSandi: '',
        kataSandiKonfirmasi: '',
        foto: result.avatar || (imagePreview || profileData.foto),
      };

      localStorage.setItem('user', JSON.stringify(result));
      setProfileData(updatedData);
      setFormData(updatedData);
      setImageFile(null);
      setImagePreview('');
      setIsEditing(false);
      setSuccessMessage('Profil berhasil diperbarui');

      // Sembunyikan success message setelah 3 detik
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Gagal update profil', err);
      setError(err.response?.data?.message || 'Gagal memperbarui profil');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    const resetData = { ...profileData };
    resetData.kataSandi = '';
    resetData.kataSandiKonfirmasi = '';
    setFormData(resetData);
    setImageFile(null);
    setImagePreview('');
    setIsEditing(false);
    setSuccessMessage('');
    setError('');
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading profil...</p>;
  // if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  if (!profileData) return null;

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        {/* Kiri - Foto Profil */}
        <div className="profile-left">
          {imagePreview || profileData.foto ? (
            <img
              src={imagePreview || profileData.foto}
              alt={profileData.namaLengkap}
              className="profile-avatar"
            />
          ) : <div className="user-menu-avatar placeholder">{profileData.namaLengkap.charAt(0).toUpperCase()}</div>}
          {isEditing && (
            <>
              <button 
                className="edit-icon" 
                onClick={handleImageClick}
                type="button"
                title="Klik untuk ganti foto"
              >
                ✎
              </button>
              <input
                ref={imageInputRef}
                type="file"
                id="image-input"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </>
          )}
        </div>

        {/* Kanan - Form Profil */}
        <div className="profile-right">
          <h2 className="profile-section-title">
            Profil {role === 'admin' ? 'Admin' : 'User'}
          </h2>

          {/* Pesan Sukses */}
          {successMessage && (
            <div
              style={{
                padding: '12px',
                marginBottom: '16px',
                backgroundColor: '#d4edda',
                color: '#155724',
                borderRadius: '4px',
                border: '1px solid #c3e6cb',
              }}
            >
              {successMessage}
            </div>
          )}

          {/* Pesan Error */}
          {error && (
            <div
              style={{
                padding: '12px',
                marginBottom: '16px',
                backgroundColor: '#f8d7da',
                color: '#721c24',
                borderRadius: '4px',
                border: '1px solid #f5c6cb',
              }}
            >
              {error}
            </div>
          )}

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
                placeholder={isEditing ? 'Kosongkan jika tidak ingin mengubah' : ''}
              />
            </div>

            <div className="form-group">
              <label>Konfirmasi Kata Sandi</label>
              <input
                type="password"
                name="kataSandiKonfirmasi"
                value={formData.kataSandiKonfirmasi}
                onChange={handleInputChange}
                readOnly={!isEditing}
                placeholder={isEditing ? 'Kosongkan jika tidak ingin mengubah' : ''}
              />
            </div>
          </div>

          <div className="profile-footer">
            {isEditing ? (
              <>
                <button
                  className="btn-cancel"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Batal
                </button>
                <button
                  className="btn-save"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan'}
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
