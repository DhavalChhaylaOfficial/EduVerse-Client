import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HighlightedText from "../../components/core/HomePage/HighlightedText";
import sweetAlert from "../Certificate/utils/sweetAlert";
import { toast } from "react-hot-toast";

const InternshipApplicationForm = () => {
  const { user } = useSelector((state) => state.profile); // Fetching user data from Redux
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    degreeProgram: "",
    yearOfStudy: "",
    gpa: "",
    desiredRole: "Web Development",
    internshipDuration: "1",
    skills: "",
    motivation: "",
    terms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Set initial values from user data
    setFormData((prevData) => ({
      ...prevData,
      fullName: `${user?.firstName || ""} ${user?.lastName || ""}`,
      email: user?.email || "",
    }));
  }, [user]);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("applicationForm");

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      // Displaying toast notification for invalid fields
      toast.error("Please fill all required fields correctly.");
      return;
    }

    try {
      setIsSubmitting(true); // Set loading state
      const response = await fetch(
        "https://eduverse-server-silk.onrender.com/api/v1/internship/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit application. Please try again.");
      }

      const result = await response.json();
      if (!result) {
        throw new Error("Invalid response from the server.");
      }

      // Show success SweetAlert
      sweetAlert({
        title: "Application Submitted",
        text: "Your application has been submitted successfully.",
        icon: "success",
        timer: 5000, // Optional: Show for 5 seconds
        confirmButtonText: "Go to Home",
      })

      // Clear form after submission
      setFormData({
        phone: "",
        university: "",
        degreeProgram: "",
        yearOfStudy: "",
        gpa: "",
        desiredRole: "Web Development",
        internshipDuration: "1",
        skills: "",
        motivation: "",
        terms: false,
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      // Show error SweetAlert
      sweetAlert({
        title: "Error",
        text: "An error occurred while submitting the application. Please try again.",
        icon: "error",
        timer: 5000, // Optional: Show for 5 seconds
      });
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, []);

  return (
    <div className="bg-gray-800 text-white font-sans min-h-screen flex justify-center items-center p-4">
      <div className="container max-w-2xl bg-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-6 text-cyan-400 hover:text-orange-400 transition-all transform hover:scale-105">
          <HighlightedText text=" Internship Application Form" />
        </h2>
        <form
          id="applicationForm"
          className="needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-2 text-gray-300">
              Full Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full opacity-60 text-gray-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-300">
              Email Address <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="email"
              id="email"
              className="w-full opacity-60 text-gray-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-gray-300">
              Phone Number <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="university" className="block mb-2 text-gray-300">
              Institution/University <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              id="university"
              className="w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
              placeholder="Institution/University"
              value={formData.university}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="degreeProgram" className="block mb-2 text-gray-300">
              Degree Program <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              id="degreeProgram"
              className="w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
              placeholder="Degree Program"
              value={formData.degreeProgram}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="yearOfStudy" className="block mb-2 text-gray-300">
              Passing Year <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="number"
              id="yearOfStudy"
              className="w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
              placeholder="Passing Year"
              value={formData.yearOfStudy}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gpa" className="block mb-2 text-gray-300">
              GPA (optional)
            </label>
            <input
              type="text"
              id="gpa"
              className="w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
              placeholder="GPA (optional)"
              value={formData.gpa}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="desiredRole" className="block mb-2 text-gray-300">
              Internship Domain <sup className="text-pink-200">*</sup>
            </label>
            <select
              id="desiredRole"
              className="w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
              value={formData.desiredRole}
              onChange={handleChange}
              required
            >
              <option>Web Development</option>
              <option>App Development</option>
              <option>Data Science</option>
              <option>Marketing</option>
              <option>Graphic Design</option>
              <option>Business Analysis</option>
              <option>Content Writing</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="internshipDuration"
              className="block mb-2 text-gray-300"
            >
              Internship Duration (Months){" "}
              <sup className="text-pink-200">*</sup>
            </label>
            <select
              id="internshipDuration"
              className="w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
              value={formData.internshipDuration}
              onChange={handleChange}
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="skills" className="block mb-2 text-gray-300">
              Skills <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="skills"
              className="w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
              rows="4"
              placeholder="Key Skills"
              value={formData.skills}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="motivation" className="block mb-2 text-gray-300">
              Why are you interested? <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="motivation"
              className="w-full placeholder:text-richblack-400 rounded-lg p-3 pr-12 bg-richblack-700 text-richblack-5 shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
              placeholder="Your motivation"
              value={formData.motivation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms" className="text-gray-300">
              I agree to the terms and conditions{" "}
              <sup className="text-pink-200">*</sup>
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-yellow-50 py-2 px-6 font-bold text-richblack-900 bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 drop-shadow-[2px_2px_rgba(255,255,255,0.18)] hover:drop-shadow-none"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InternshipApplicationForm;
