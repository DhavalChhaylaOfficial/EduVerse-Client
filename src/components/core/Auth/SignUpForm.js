import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillCheckCircleFill, BsCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignUpData } from "../../../redux/slices/authSlice";
import { sendOtp } from "../../../services/operations/authServices";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Student",
  });
  const [requirements, setRequirements] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isMinLength: false,
  });

  const { firstName, lastName, email, password, confirmPassword, role } =
    formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password") {
      setRequirements({
        hasLowercase: /[a-z]/.test(value),
        hasUppercase: /[A-Z]/.test(value),
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        isMinLength: value.length >= 8,
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password and Confirm password do not match");
      return;
    }

    const isPasswordValid =
      requirements.hasLowercase &&
      requirements.hasUppercase &&
      requirements.hasNumber &&
      requirements.hasSpecialChar &&
      requirements.isMinLength;

    if (!isPasswordValid) {
      toast.error("Password does not meet all requirements");
      return;
    }

    dispatch(setSignUpData(formData));
    sendOtp(email, dispatch, navigate);
  };

  return (
    <div>
      <form
        className="mt-6 flex w-full flex-col gap-y-4"
        onSubmit={handleOnSubmit}
      >
        <div className="flex gap-4">
          {/* First Name */}
          <label className="w-1/2">
            <p className="mb-1 text-sm text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              required
              className="w-full rounded-lg p-3 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] placeholder:text-richblack-400"
            />
          </label>

          {/* Last Name */}
          <label className="w-1/2">
            <p className="mb-1 text-sm text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              required
              className="w-full rounded-lg p-3 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] placeholder:text-richblack-400"
            />
          </label>
        </div>

        {/* Email */}
        <label>
          <p className="mb-1 text-sm text-richblack-5">
            Email <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={handleOnChange}
            required
            className="w-full rounded-lg p-3 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] placeholder:text-richblack-400"
          />
        </label>

        <div className="flex gap-4">
          {/* Password */}
          <label className="relative w-1/2">
            <p className="mb-1 text-sm text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={handleOnChange}
              required
              className="w-full rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] placeholder:text-richblack-400"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          {/* Confirm Password */}
          <label className="relative w-1/2">
            <p className="mb-1 text-sm text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              required
              className="w-full rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] placeholder:text-richblack-400"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        {/* Password requirements */}
        <div className="mt-6 flex flex-row gap-x-3 text-xs text-caribbeangreen-300">
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-1">
              {requirements.hasLowercase ? (
                <BsFillCheckCircleFill />
              ) : (
                <BsCircle />
              )}{" "}
              One Lowercase Character
            </div>
            <div className="flex items-center gap-x-1">
              {requirements.hasUppercase ? (
                <BsFillCheckCircleFill />
              ) : (
                <BsCircle />
              )}{" "}
              One Uppercase Character
            </div>
            <div className="flex items-center gap-x-1">
              {requirements.hasNumber ? (
                <BsFillCheckCircleFill />
              ) : (
                <BsCircle />
              )}{" "}
              One Number
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-1">
              {requirements.hasSpecialChar ? (
                <BsFillCheckCircleFill />
              ) : (
                <BsCircle />
              )}{" "}
              One Special Character
            </div>
            <div className="flex items-center gap-x-1">
              {requirements.isMinLength ? (
                <BsFillCheckCircleFill />
              ) : (
                <BsCircle />
              )}{" "}
              8 Character Minimum
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 rounded-lg bg-yellow-50 py-2 px-3 font-bold text-richblack-900 bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] hover:scale-95 transition-all duration-200 drop-shadow-[2px_2px_rgba(255,255,255,0.18)]"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
