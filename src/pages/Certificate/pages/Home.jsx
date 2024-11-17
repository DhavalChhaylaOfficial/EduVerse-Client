import React, { useEffect, useState } from 'react';
import PrimaryButton from '../components/commons/PrimaryButton';
import LoadingIndicator from '../components/commons/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { requestCertificate } from '../store/certificateActions';
import { useLocation } from 'react-router-dom'; 
import HighlightedText from "../../../components/core/HomePage/HighlightedText";

const CertificateRequestForm = () => {
  const dispatch = useDispatch();
  const isRequesting = useSelector((state) => state.certificate.isRequesting);
  const { user } = useSelector((state) => state.profile); // Fetch user data from Redux store
  
  const location = useLocation(); // Get location data
  
  const [certificateData, setCertificateData] = useState({
    name: '',
    course: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const { name, course, email } = certificateData;

  // Pre-fill form fields with user data and course name from location.state
  useEffect(() => {
    if (user) {
      setCertificateData({
        name: user.firstName + ' ' + user.lastName, // Set full name
        email: user.email, // Set email
        course: location.state?.course || '', // Set course from location state or fallback
      });
    }
  }, [user, location.state]); // Dependency array ensures it updates if user data or location.state changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    dispatch(requestCertificate(certificateData));
    // clear data after Certificate form submission
    // setCertificateData({
    //   name: '',
    //   course: '',
    //   email: '',
    // });
    setErrors({});
  };

  const handleUpdateValue = (key, value) => {
    setCertificateData((prevState) => ({ ...prevState, [key]: value }));
  };

  // Handler for error validation
  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!course.trim()) {
      errors.course = 'Course is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  return (
    <div className="flex flex-grow items-center justify-center md:px-8 px-4 md:pt-12 pt-10 md:pb-14 pb-12">
      <form onSubmit={handleSubmit} className={`lg:w-1/2 md:w-3/4 w-full ${isRequesting ? 'opacity-35' : ''}`}>
        <fieldset className="rounded-xl p-4 sm:p-8 shadow-lg shadow-purple-600 bg-gradient-to-br from-gray-400 to-slate-200">
          <legend className="sm:text-3xl text-2xl font-semibold text-gray-800">
            <HighlightedText text={"Get Your Certificate"} />
          </legend>
          
          <div>
            <label htmlFor="name" className="block text-gray-700 font-bold">
              Name
            </label>
            <input
              type="text"
              id="name"
              disabled
              value={name}
              onChange={(e) => handleUpdateValue('name', e.target.value)}
              className="w-full opacity-80 text-gray-400 rounded-lg px-3 py-2 mb-4 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
            />
            {errors.name && <p className="text-red-500 text-sm -mt-4 mb-4">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="course" className="block text-gray-700 font-bold">
              Course
            </label>
            <input
              type="text"
              id="course"
              disabled
              value={course}
              onChange={(e) => handleUpdateValue('course', e.target.value)}
              className="w-full opacity-80 text-gray-400 rounded-lg px-3 py-2 mb-4 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
            />
            {errors.course && <p className="text-red-500 text-sm -mt-4 mb-4">{errors.course}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              disabled
              value={email}
              onChange={(e) => handleUpdateValue('email', e.target.value)}
              className="w-full opacity-80 text-gray-400 rounded-lg px-3 py-2 mb-4 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
            />
            {errors.email && <p className="text-red-500 text-sm -mt-4 mb-4">{errors.email}</p>}
          </div>
          <br />
          <PrimaryButton 
            className="rounded-lg bg-yellow-50 py-2 px-6 font-bold text-richblack-900 bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 drop-shadow-[2px_2px_rgba(255,255,255,0.18)] hover:drop-shadow-none" 
            isLoading={isRequesting} 
            title={isRequesting ? 'Sending Request...' : 'Get Certificate'} 
          />
        </fieldset>
      </form>

      {isRequesting && <LoadingIndicator loadingText={'Requesting...'} />}
    </div>
  );
};

export default CertificateRequestForm;
