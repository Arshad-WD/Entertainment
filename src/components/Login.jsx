import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    Email_id: "",
    Password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          // Redirect on successful login
          window.location.href = "http://localhost:5173";
        } else {
          // Handle user not found or other errors
          if (data.error === "User not found") {
            alert("User does not exist. Please check your credentials.");
          } else {
            alert(data.error || "Login failed. Please check your credentials.");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to submit form!");
      }

      setIsSubmitting(false);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="bg-signimg flex justify-center items-start h-screen bg-cover bg-center align-middle mt-0">
      <div className="bg-white/20 backdrop-blur-sm p-10 rounded-lg shadow-md w-[30rem] mt-4 h-[30rem] border-[0.5px] animate-fade-in">
        <form onSubmit={formValidation} className="flex flex-col items-center">
          <h1 className="text-5xl mb-6 text-white">Login</h1>
          <div className="relative w-full mb-6 mt-14">
            <input
              type="email"
              name="Email_id"
              value={formData.Email_id}
              onChange={handleInputChange}
              required
              className={`w-full bg-transparent border-b-2 py-2 text-white transition-all duration-300 peer ${errors.Email_id ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-white`}
            />
            <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${formData.Email_id ? "-translate-y-5 text-white" : "translate-y-0 text-gray-400"}`}>
              Enter Email
            </label>
            {errors.Email_id && <p className="text-red-500 text-sm">{errors.Email_id}</p>}
          </div>
          <div className="relative w-full mb-6">
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
              required
              className={`w-full bg-transparent border-b-2 py-2 text-white transition-all duration-300 peer ${errors.Password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-white`}
            />
            <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${formData.Password ? "-translate-y-5 text-white" : "translate-y-0 text-gray-400"}`}>
              Enter Password
            </label>
            {errors.Password && <p className="text-red-500 text-sm">{errors.Password}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white/20 border-2 border-white mt-10 py-2 px-6 rounded-full text-white hover:bg-white/40 transition-all duration-300"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <div className="text-white font-thin mt-8">
            Do not have an account? <span onClick={() => window.location.href = "http://localhost:5173/sign-in"} className="cursor-pointer underline">Create New</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
