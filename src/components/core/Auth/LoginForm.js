import React from 'react'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../services/operations/authServices'
import { useDispatch } from 'react-redux'


const LoginForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value
      }
    ))
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    login(email, password, dispatch, navigate);
  }

  return (
    <div className='' >
      <form className='mt-6 flex w-full flex-col gap-y-4'
        onSubmit={handleOnSubmit} >
        <label className='w-full' >
          <p className='mb-1 text-sm leading-[1.375rem] text-richblack-5' >Email Address <sup className='text-pink-200' >*</sup></p>
          <input
            type="email"
            placeholder='Enter Email Address'
            name='email'
            value={email}
            onChange={handleOnChange}
            required
            className='w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]'
          />
        </label>


        <label className='w-full relative' >
          <p className='mb-1 text-sm leading-[1.375rem] text-richblack-5' >Password <sup className='text-pink-200' >*</sup></p>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter Password'
            name='password'
            value={password}
            onChange={handleOnChange}
            required
            className='w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]'
          />

          <span className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => setShowPassword(prev => !prev)} >
            {
              showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            }
          </span>

          <Link to='/forgot-password' >
            <p className=' ml-auto mt-1 max-w-max text-xs'style={{color : "#00e1ff"}} > Forgot Password</p>
          </Link>
        </label>

        <button type='submit' className='mt-6 rounded-lg bg-yellow-50 py-2 px-3 font-bold text-richblack-900 bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 drop-shadow-[2px_2px_rgba(255,255,255,0.18)] hover:drop-shadow-none' >
          Sign In
        </button>
      </form>


    </div>
  )
}

export default LoginForm
