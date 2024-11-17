import React from 'react'
import { useSelector } from 'react-redux'
import frame from '../../../assets/Images/frame.png'
import Spinner from '../../common/Spinner'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const Template = ({ heading, desc1, desc2, image, formType }) => {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className='bg-richblack-900 min-h-[calc(100vh-3.5rem)] flex place-items-center'>
      {
        loading ? (
          <div className='w-full'><Spinner /></div>
        ) : (
          <div className='w-11/12 mx-auto max-w-maxContent flex flex-col-reverse md:flex-row justify-between gap-y-12 md:gap-y-0 md:gap-x-12 py-12'>
            {/* Left Column: Text and Forms */}
            <div className='mx-auto w-11/12 max-w-[450px] md:mx-0'>
              <h1 className='text-3xl font-semibold leading-[2.375rem] text-richblack-5'>
                {heading}
              </h1>
              <p className='mt-4 text-lg leading-[1.625rem]'>
                <span className='text-richblack-100' style={{ color: "#00e1ff" }}>
                  {desc1}
                </span>
                {' '}
                <span className='' style={{ color: "#00e1ff" }}>
                  {desc2}
                </span>
              </p>

              <div>
                {
                  formType === 'login' ? <LoginForm /> : <SignUpForm />
                }
              </div>
            </div>

            {/* Right Column: Image */}
            <div className='relative mx-auto md:mx-0 w-11/12 max-w-[500px]'>
              <img 
                src={image} 
                className='w-full md:absolute md:-top-4 md:right-4 md:z-10' 
                loading='lazy' 
                alt="Students" 
              />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Template
