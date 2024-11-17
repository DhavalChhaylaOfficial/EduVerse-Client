import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import HighlightedText from './HighlightedText'
import CTAButton from './CTAButton';
import Instructor from '../../../assets/Images/teacher2.png'
import Img from './../../common/Img.jsx';

import { motion } from 'framer-motion'
import { scaleUp } from './../../common/motionFrameVarients';

const InstructorSection = () => {
  return (
    <div className='flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 items-center'>

    <motion.div
      variants={scaleUp}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.1 }}
      className='lg:w-[50%] shadow-[10px_-5px_50px_-5px] shadow-blue-200 rounded-3xl overflow-hidden'>
      <Img
        src={Instructor}
        alt="Instructor"
        className='shadow-white object-fill rounded-3xl'
      />
    </motion.div>

      <div className='lg:w-[50%] flex flex-col gap-10' >
        <div className=' lg:w-[50%] text-4xl font-semibold '>
          Become an
          <HighlightedText text="instructor" />
        </div>
        <div className='font-medium text-base w-[90%] text-richblack-300' >
          Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
        </div>

        <div className='w-fit' >
          <CTAButton active={true} linkto={'/contact'} >
            <div className='flex flex-row items-center gap-2' >
              Start Teaching Today
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
