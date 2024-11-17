import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImage from '../assets/Images/Login_img.png'

const LogIn = () => {
  return (
    <div>
      <Template
        heading={'Welcome Back'}
        desc1={'Build skills for today, tomorrow, and beyond.'}
        desc2={'Education to future-proof your career.'}
        image={loginImage}
        formType={'login'}
      />
    </div>
  )
}

export default LogIn
