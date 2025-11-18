import React, { useState } from "react";
import '../styles/profile.css';
import Header from "../components/header";
import Footer from "../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser} from '@fortawesome/free-solid-svg-icons';


const Profile = () => {
  // Жишээ – дараа нь backend-ээс авдаг болно
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    address: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // TODO: энд /api/users/me PUT/PATCH хийнэ
      console.log("Хадгалах өгөгдөл:", formData);

      await new Promise((r) => setTimeout(r, 1000));
      alert("Хувийн мэдээлэл амжилттай хадгалагдлаа.");
    } catch (err) {
      console.error(err);
      alert("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setIsSaving(false);
    }
  };

  // Хаах функц
  const handleClose = () => {
    window.location.href = "/home";
  };

  return (
    <div className="profile-page">
      <Header/>
      
      <div className="profile-container">
        <div className="profile-modal">
          <div className="profile-header">
            <h2>Хувийн мэдээлэл</h2>
            <button className="profile-close" onClick={handleClose}>✕</button>
          </div>

          <div className="profile-body">
            {/* Зураг / icon */}
            <div className="pro-avatar">
              <span className="avatar-icon">
                <FontAwesomeIcon icon={faUser}/>
                </span>
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>

              <div className="profile-field">
                <input
                  type="text"
                  name="firstName"
                  placeholder="өөрийн нэр"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <input
                  type="tel"
                  name="phone"
                  placeholder="утас"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <input
                  type="email"
                  name="email"
                  placeholder="и мэйл"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Байгуулга оруулах"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-actions">
                <button
                  type="submit"
                  className="profile-save-btn"
                  disabled={isSaving}
                >
                  {isSaving ? "Хадгалж байна..." : "Хадгалах"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
    
  );
};

export default Profile;