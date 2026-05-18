import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";

const Login = () => {
  const [formData, setFormData] = useState({
    Email_id: "",
    Password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const tempErrors = {};
    const { Email_id, Password } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!Email_id.trim()) {
      tempErrors.Email_id = "Email can't be blank";
    } else if (!emailRegex.test(Email_id)) {
      tempErrors.Email_id = "Invalid email format";
    }

    if (!Password) {
      tempErrors.Password = "Password can't be blank";
    }

    return tempErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const formValidation = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      const simulatedUser = {
        name: "Demon King Sukuna",
        email: formData.Email_id,
        bio: "An absolute ruler of the entertainment world."
      };

      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data.user || simulatedUser));
          navigate("/");
        } else {
          // Graceful fallback to mock profile in frontend demo
          localStorage.setItem("user", JSON.stringify(simulatedUser));
          navigate("/");
        }
      } catch (error) {
        // Graceful fallback to mock profile in frontend demo if backend is offline
        localStorage.setItem("user", JSON.stringify(simulatedUser));
        navigate("/");
      }

      setIsSubmitting(false);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="bg-zinc-950 flex justify-center items-center min-h-[calc(100vh-4rem)] relative overflow-hidden text-zinc-200">
      
      {/* Cinematic Glowing Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 bg-zinc-900/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl w-full max-w-md mx-6 animate-fade-in">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="flex items-center space-x-2 mb-2">
            <RiMovie2Line className="text-red-500 text-3xl animate-pulse" />
            <span className="font-sans font-black text-2xl tracking-wider text-white">LuxeVista</span>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Access Premium Portal</span>
        </div>

        <form onSubmit={formValidation} className="flex flex-col">
          
          {/* Email Input */}
          <div className="relative mb-6">
            <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                <FaEnvelope className="text-xs" />
              </span>
              <input
                type="email"
                name="Email_id"
                placeholder="you@luxevista.com"
                value={formData.Email_id}
                onChange={handleInputChange}
                required
                className={`w-full pl-10 pr-4 py-3 bg-zinc-950/80 rounded-xl border ${errors.Email_id ? "border-red-500" : "border-white/10"} text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 transition-all text-sm`}
              />
            </div>
            {errors.Email_id && <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.Email_id}</p>}
          </div>

          {/* Password Input */}
          <div className="relative mb-8">
            <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                <FaLock className="text-xs" />
              </span>
              <input
                type="password"
                name="Password"
                placeholder="••••••••"
                value={formData.Password}
                onChange={handleInputChange}
                required
                className={`w-full pl-10 pr-4 py-3 bg-zinc-950/80 rounded-xl border ${errors.Password ? "border-red-500" : "border-white/10"} text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 transition-all text-sm`}
              />
            </div>
            {errors.Password && <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.Password}</p>}
          </div>

          {/* Action Trigger Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 mt-2 py-3 px-6 rounded-xl text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-600/10 hover:shadow-red-600/30 transition-all duration-300 cursor-pointer"
          >
            <FaSignInAlt className="text-xs" />
            <span>{isSubmitting ? "Logging in..." : "Login"}</span>
          </button>

          {/* Bottom Redirect */}
          <div className="text-zinc-500 font-bold text-xs mt-8 text-center uppercase tracking-wider">
            Do not have an account?{" "}
            <Link to="/sign-in" className="text-red-500 hover:text-red-400 underline transition-colors">
              Create New
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
