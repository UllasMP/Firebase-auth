import { useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);

    // simulate API call (Firebase later)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);

    if (isLogin) {
      setMessage("Login successful");
    } else {
      setMessage("Signup successful");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>{isLogin ? "Login" : "Signup"}</h2>

        {message && (
          <p className="message">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your email"
            />

          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your password"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Signup"}
          </button>

        </form>

        <p className="switch-text">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="switch-btn"
          >
            {isLogin ? "Signup" : "Login"}
          </button>

        </p>

      </div>

    </div>
  );
}