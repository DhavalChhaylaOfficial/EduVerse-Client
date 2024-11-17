import React from 'react'

const IconBtn = ({ ...btnData }) => {

  const { children, text, onClickHandler, disabled, outline = false, customClasses, type } = btnData;

  return (
    <div className='text-white' >
      <button
        onClick={onClickHandler}
        disabled={disabled}
        type={type}
        className={` ${customClasses} rounded-md py-2 px-5 font-semibold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 drop-shadow-[2px_2px_rgba(255,255,255,0.18)] hover:drop-shadow-none
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${outline ? 'border border-richblack-700 bg-transparent' : 'bg-yellow-50'}
        `}
      >
        {
          children ?
            (
              <div className={`flex items-center gap-x-2 
              ${outline && ''}
              `} >
                {text}
                {children}
              </div>
            )
            :
            (<div>{text}</div>)
        }
      </button>
    </div>
  )
}

export default IconBtn
