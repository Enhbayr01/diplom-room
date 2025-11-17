// src/page/ChangePassword.jsx
import React, { useState } from "react";
import "../styles/password.css";
import Header from "../components/header";
import Footer from "../components/footer";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.currentPassword) {
      errs.currentPassword = "Хуучин нууц үгээ оруулна уу";
    }
    if (!formData.newPassword) {
      errs.newPassword = "Шинэ нууц үг оруулна уу";
    } else if (formData.newPassword.length < 6) {
      errs.newPassword = "Шинэ нууц үг 6-аас дээш тэмдэгт байна";
    }
    if (!formData.confirmPassword) {
      errs.confirmPassword = "Нууц үгээ давтан оруулна уу";
    } else if (formData.newPassword !== formData.confirmPassword) {
      errs.confirmPassword = "Нууц үг тохирохгүй байна";
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setIsSaving(true);
    try {
      // TODO: backend рүү /api/users/change-password POST хийх хэсэг
      console.log("Password change payload:", formData);
      await new Promise((r) => setTimeout(r, 1000));
      alert("Нууц үг амжилттай шинэчлэгдлээ.");
      // Амжилттай болгосны дараа формыг цэвэрлэх
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      alert("Нууц үг солих үед алдаа гарлаа.");
    } finally {
      setIsSaving(false);
    }
  };

  // Хаах функц
  const handleClose = () => {
    window.history.back();
  };

  return (
    <div className="password-page">
      <Header/>
      <div className="password-container">
        <div className="pw-modal">
          <div className="pw-header">
            <h2>Нууц үг солих</h2>
            <button className="pw-close" onClick={handleClose}>✕</button>
          </div>

          <form className="pw-form" onSubmit={handleSubmit}>
            <div className="pw-field">
              <input
                type="password"
                name="currentPassword"
                placeholder="Хуучин нууц үг"
                value={formData.currentPassword}
                onChange={handleChange}
                className={errors.currentPassword ? "error" : ""}
              />
              {errors.currentPassword && (
                <span className="error-text">{errors.currentPassword}</span>
              )}
            </div>

            <div className="pw-field">
              <input
                type="password"
                name="newPassword"
                placeholder="Шинэ нууц үг"
                value={formData.newPassword}
                onChange={handleChange}
                className={errors.newPassword ? "error" : ""}
              />
              {errors.newPassword && (
                <span className="error-text">{errors.newPassword}</span>
              )}
            </div>

            <div className="pw-field">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Шинэ нууц үг (давтан)"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="pw-actions">
              <button
                type="submit"
                className="pw-save-btn"
                disabled={isSaving}
              >
                {isSaving ? "Хадгалж байна..." : "Хадгалах"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ChangePassword;