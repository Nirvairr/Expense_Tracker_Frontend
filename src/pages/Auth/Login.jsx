import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance"; // or wherever it's located
import { API_PATHS } from "../../utils/apiPaths"; // adjust to actual path
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // a function to handle form submission.
    e.preventDefault(); // prevent the page when you submit login form.
    if (!validateEmail(email)) {
      setError("please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("please enter the password");
      return;
    }

    setError("");
    //login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", user._id);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.mesage) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          {" "}
          Please enter your details to login
        </p>

        <form onSubmit={handleLogin}>
          {" "}
          {/** form that triggers handleLogin when submitted. inside the form 1. value={email} -> its value is controlled by yhe email state , 2. onChange={({target})=> setEmail(target.value)} → Whenever you type, it updates the email state */}
          <label className="text-sm mb-1">Email Address</label>
          <br />
          <Input /** input for user to enter their email */
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="john@example.com"
            type="text"
          />
          <br />
          <label className="text-sm mb-1 ">Password</label>
          <br />
          <Input /** input for users to enter their password */
            className="mb-4"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="min 8 characters"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <br />
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have a account?{""}
            <Link className="font-medium text-sky-500 underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
