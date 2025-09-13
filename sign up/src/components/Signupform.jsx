import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOtp = () => {
    if (!formData.email) {
      setError("Please enter your email first.");
      return;
    }
    setError("");
    setOtpSent(true);
    alert(`OTP sent to ${formData.email} ✅`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.otp || !formData.password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    console.log("Signup Data:", formData);
    alert("Signup Successful 🎉");
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email + Send OTP */}
          <div style={styles.row}>
            <div style={{ flex: 2, marginRight: "10px" }}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your email"
              />
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
              <button type="button" onClick={handleSendOtp} style={styles.otpButton}>
                Send OTP
              </button>
            </div>
          </div>

          {/* OTP */}
          {otpSent && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Enter OTP:</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter the OTP"
              />
            </div>
          )}

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Create a password"
            />
          </div>

          {/* Submit */}
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  card: {
    position: "relative",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "380px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    zIndex: 1,
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    marginBottom: "15px",
  },
  inputGroup: {
    marginBottom: "15px",
    flex: 1,
  },
  label: {
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#444",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  otpButton: {
    padding: "10px",
    background: "linear-gradient(135deg, #f6d365, #fda085)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    width: "100%",
  },
  button: {
    padding: "12px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default SignupForm;
