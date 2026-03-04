import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = ["/room1.jpg", "/room2.jpg", "/room3.jpg"];

const AuthPage = () => {
  const navigate = useNavigate();

  const [view, setView] = useState("login");
  const [current, setCurrent] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /* IMAGE SLIDER */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

const handleLoginSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(
      "https://hotel-server-six.vercel.app/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      },
    );

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);

      if (data.user.role === "admin") {
        navigate("/dashboard"); // admin dashboard
      } else {
        navigate("/Home"); // normal user home page
      }
    } else {
      setError(data.message);
      setShowModal(true);
    }
  } catch {
    setError("Server error");
    setShowModal(true);
  }
};

const handleSignupSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(
      "https://hotel-server-six.vercel.app/api/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful! Please login.");
      setView("login");
    } else {
      alert(data.message);
    }
  } catch {
    alert("Server error");
  }
};
  return (
    <>
      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="text-gray-800">{error}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-full max-w-5xl bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* LEFT IMAGE SLIDER */}
          <div className="md:w-1/2 w-full relative h-96 md:h-auto">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
                alt=""
              />
            ))}
          </div>

          {/* RIGHT FORM */}
          <div className="md:w-1/2 w-full p-10 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2 text-center">
              {view === "login" ? "Welcome Back 👋" : "Create Account ✨"}
            </h2>

            <p className="text-gray-400 mb-8 text-center">
              {view === "login" ? "Login to continue" : "Signup to get started"}
            </p>

            <form
              className="space-y-5"
              onSubmit={
                view === "login" ? handleLoginSubmit : handleSignupSubmit
              }
            >
              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email Address"
                value={view === "login" ? formData.email : form.email}
                onChange={(e) =>
                  view === "login"
                    ? setFormData({ ...formData, email: e.target.value })
                    : setForm({ ...form, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600
                focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              {/* PASSWORD WITH SHOW/HIDE */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={view === "login" ? formData.password : form.password}
                  onChange={(e) =>
                    view === "login"
                      ? setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      : setForm({
                          ...form,
                          password: e.target.value,
                        })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-purple-500 transition pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {/* BUTTON */}
              <button
                className={`w-full py-3 rounded-lg font-semibold text-lg transition
                ${
                  view === "login"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {view === "login" ? "Login" : "Signup"}
              </button>
            </form>

            {/* SWITCH */}
            <p
              className="text-center mt-6 text-sm text-gray-400 cursor-pointer hover:text-purple-400 transition"
              onClick={() => setView(view === "login" ? "signup" : "login")}
            >
              {view === "login"
                ? "Don’t have an account? Signup"
                : "Already have an account? Login"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;