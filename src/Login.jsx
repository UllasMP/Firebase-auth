import { useState, useEffect } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeText, setWelcomeText] = useState("Initializing...");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {

  const t1 = setTimeout(() => {
    setWelcomeText("Stark Industries");
  }, 1000);

  const t2 = setTimeout(() => {
    setWelcomeText("Welcome User");
  }, 2500);

  const t3 = setTimeout(() => {
    setShowWelcome(false);
    setShowForm(true);
  }, 4000);

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
  };

}, []);

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
  if (showWelcome) {
  return (
    <div>
      <h1>{welcomeText}</h1>
    </div>
  );
}
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