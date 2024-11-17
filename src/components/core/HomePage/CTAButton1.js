import React from 'react';
import { Link } from 'react-router-dom';

const CTAButton1 = ({ children, active, linkto, newTab = false }) => {
  const buttonClasses = `text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold 
    ${active ? "bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900" : "bg-richblack-800 text-white"}
    hover:scale-95 transition-all duration-200 drop-shadow-[2px_2px_rgba(255,255,255,0.18)] hover:drop-shadow-none`;

  return newTab ? (
    <a href={linkto} target="_blank" rel="noopener noreferrer" className={buttonClasses}>
      {children}
    </a>
  ) : (
    <Link to={linkto} className={buttonClasses}>
      {children}
    </Link>
  );
};

export default CTAButton1;
