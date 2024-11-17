import React, { useState } from 'react';
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import { resetPassword } from '../services/operations/authServices';
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillCheckCircleFill, BsCircle } from 'react-icons/bs';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [requirements, setRequirements] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isMinLength: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading } = useSelector(state => state.auth);

  const { password, confirmPassword } = formData;
  const resetToken = searchParams.get('reset-token');

  if (!resetToken) {
    return <Navigate to={'/login'} />;
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Check password requirements only for the password field
    if (name === 'password') {
      setRequirements({
        hasLowercase: /[a-z]/.test(value),
        hasUppercase: /[A-Z]/.test(value),
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        isMinLength: value.length >= 8,
      });
    }
  };

  const handleOnResetPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(`Passwords don't match`);
      return;
    }
    resetPassword(resetToken, password, dispatch, navigate);
  };

  return (
    <div className='text-white bg-richblack-900 min-h-[calc(100vh-3.5rem)] flex place-items-center'>
      {
        loading
          ? (<div className='w-full'><Spinner /></div>)
          : (
            <div className='w-11/12 max-w-[500px] p-4 lg:p-8 mx-auto flex flex-col'>
              <h2 className='text-3xl font-semibold leading-[2.375rem] text-richblack-5'>
                Choose new password
              </h2>

              <p className='text-richblack-100 my-4 text-lg leading-[1.625rem]'>
                Almost done. Enter your new password and you're all set.
              </p>

              <form onSubmit={handleOnResetPassword}>
                <label className='block relative'>
                  <p className='mb-1 text-sm leading-[1.375rem] text-richblack-5'>New Password <sup className='text-pink-200'>*</sup></p>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter Password'
                    name='password'
                    value={password}
                    onChange={handleOnChange}
                    required
                    className='w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]'
                  />

                  <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}
                  </span>
                </label>

                <label className='block relative'>
                  <p className='mb-1 mt-6 text-sm leading-[1.375rem] text-richblack-5'>Confirm New Password <sup className='text-pink-200'>*</sup></p>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleOnChange}
                    required
                    className='w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]'
                  />

                  <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                    {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}
                  </span>
                </label>

                {/* Dynamic password requirements */}
                <div className='mt-6 flex flex-row gap-x-3 text-xs leading-[20px] text-caribbeangreen-300'>
                  <div className='flex flex-col gap-y-1'>
                    <div className='flex gap-x-1 items-center'>
                      {requirements.hasLowercase ? <BsFillCheckCircleFill /> : <BsCircle />}
                      One Lowercase Character
                    </div>
                    <div className='flex gap-x-1 items-center'>
                      {requirements.hasUppercase ? <BsFillCheckCircleFill /> : <BsCircle />}
                      One Uppercase Character
                    </div>
                    <div className='flex gap-x-1 items-center'>
                      {requirements.hasNumber ? <BsFillCheckCircleFill /> : <BsCircle />}
                      One Number
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-1'>
                    <div className='flex gap-x-1 items-center'>
                      {requirements.hasSpecialChar ? <BsFillCheckCircleFill /> : <BsCircle />}
                      One Special Character
                    </div>
                    <div className='flex gap-x-1 items-center'>
                      {requirements.isMinLength ? <BsFillCheckCircleFill /> : <BsCircle />}
                      8 Character Minimum
                    </div>
                  </div>
                </div>

                <button type='submit' className='w-full p-3 rounded-lg mt-6 font-medium bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 drop-shadow-[2px_2px_rgba(255,255,255,0.18)] hover:drop-shadow-none'>
                  Reset Password
                </button>
              </form>

              <Link to={'/login'}>
                <div className='mt-6 flex items-center gap-x-2 text-richblack-5'>
                  <BiArrowBack />
                  <p>Back To Login</p>
                </div>
              </Link>
            </div>
          )
      }
    </div>
  )
}

export default ResetPassword;
