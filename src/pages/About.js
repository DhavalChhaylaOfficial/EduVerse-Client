import React, { useEffect, useState } from "react";
import HighlightedText from "../components/core/HomePage/HighlightedText";
import Footer from "../components/common/Footer";
import FoundingStory from "../assets/Images/456.jpeg";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage.js/Quote";
import StudyNotionStats from "../components/core/AboutPage.js/StudyNotionStats";
import LearningGrid from "../components/core/AboutPage.js/LearningGrid";
import ContactUsForm from "../components/core/ContactPage/ContactUsForm";
import { getAllReviews } from "../services/operations/otherServices";
import ReviewsSlider from "../components/common/ReviewsSlider";
import Spinner from "../components/common/Spinner";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import neel from "../assets/Images/nil.jpg";
import dhaval from "../assets/Images/dhaval.png";
import { motion } from "framer-motion";
import { fadeIn } from "../components/common/motionFrameVarients";

const About = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
    const fetchAllReviews = async () => {
      setLoading(true);
      const response = await getAllReviews();
      if (response) {
        setReviews(response);
      }
      setLoading(false);
    };
    fetchAllReviews();
  }, []);

  return (
    <div className="text-white">
      {/* Section 1 */}

      <div className="relative w-11/12 mx-auto max-w-maxContent flex flex-col justify-between py-12">
        <h1 className="text-center font-semibold text-4xl mx-auto lg:w-[70%]">
          Driving Innovation in Online Education for a
          <HighlightedText text={"Brighter Future"} />
        </h1>

        <p className="mx-auto lg:w-[70%] mt-3 text-center font-medium text-richblack-300">
          EduVerse is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies, and
          nurturing a vibrant learning community.
        </p>

        <div className="about mt-20  text-center min-h-[55vh]">
          <div className="flex flex-wrap justify-center gap-14 mb-16">
            {/* Team Member 1 */}
            <div className="team-member text-center">
              <img
                src={neel}
                alt="Neel Desai"
                className="transition-all duration-200 shadow-[10px_-5px_50px_-5px] shadow-blue-200 rounded-3xl overflow-hidden  max-w-[150px] mx-auto mb-4 hover:scale-110 hover:shadow-lg"
              />
              <h5 className="mt-4 text-lg font-semibold">
                <HighlightedText text={"Neel Desai"} />
              </h5>
              <p className="italic font-medium">
                <HighlightedText text={"Founder & CEO"} />{" "}
              </p>
              <div className="social-links mt-3 flex justify-center space-x-4">
                <a
                  href="https://www.linkedin.com/in/neeldesaind/"
                  target="_blank"
                  className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 rounded-full p-2 border-2 border-blue-600 flex items-center justify-center w-10 h-10"
                >
                  <AiFillLinkedin />
                </a>
                <a
                  href="https://github.com/neeldesaind"
                  target="_blank"
                  className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 rounded-full p-2 border-2 border-blue-600 flex items-center justify-center w-10 h-10"
                >
                  <AiFillGithub />
                </a>
              </div>
              <p className="mt-4 italic">
                <HighlightedText
                  text={
                    "Visionary leader with a passion for education and technology"
                  }
                />
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="team-member text-center">
              <img
                src={dhaval}
                alt="Dhaval Chhayla"
                className="transition-all duration-200 shadow-[10px_-5px_50px_-5px] shadow-blue-200 rounded-3xl overflow-hidden  max-w-[150px] mx-auto mb-4 hover:scale-110 hover:shadow-lg"
              />
              <h5 className="mt-4 text-lg font-semibold">
                {" "}
                <HighlightedText text={"Dhaval Chhayla"} />
              </h5>
              <p className="italic font-medium">
                {" "}
                <HighlightedText text={"Founder & CEO"} />{" "}
              </p>
              <div className="social-links mt-3 flex justify-center space-x-4">
                <a
                  href="https://linkedin.com/in/dhaval-chhayla"
                  target="_blank"
                  className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 rounded-full p-2 border-2 border-blue-600 flex items-center justify-center w-10 h-10"
                >
                  <AiFillLinkedin />
                </a>
                <a
                  href="https://github.com/DhavalChhaylaOfficial"
                  target="_blank"
                  className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 rounded-full p-2 border-2 border-blue-600 flex items-center justify-center w-10 h-10"
                >
                  <AiFillGithub />
                </a>
              </div>
              <p className="mt-4 text-gray-600 italic">
                <HighlightedText
                  text={
                    "Brings extensive experience in educational content development"
                  }
                />
              </p>
            </div>
          </div>
          <div className="bg-richblack-900 border-b-4 border-richblack-700 mb-12">
            {" "}
          </div>
          <Quote />
          <div className="bg-richblack-900 border-b-4 border-richblack-700">
            {" "}
          </div>
        </div>
      </div>

      {/* Section 2 */}
      {/* <div className="bg-richblack-900 border-b border-richblack-700"> </div> */}
      {/* <div className="mx-auto max-w-maxContent flex flex-col justify-between">
          <Quote />
        </div> */}
      {/* </div> */}

      {/* Section 3 */}
      <div className="bg-richblack-900">
        <div className="w-11/12 mx-auto max-w-maxContent flex flex-col justify-between mt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex flex-col gap-10 lg:w-[50%] my-10">
              <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">
                Our Founding Story
              </h1>
              <p className="font-medium text-richblack-300 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>

              <p className="font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div>
              <img
                src={FoundingStory}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#FC6767] w-96 h-auto"
                style={{ width: "28rem", height: "auto" }}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-10 mb-20">
            <div className="flex flex-col gap-5 lg:gap-10 lg:w-[40%] mt-10 lg:mt-0">
              <h1 className=" text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#FF512F] to-[#F09819]">
                Our Vision
              </h1>
              <p className="font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            <div className="flex flex-col  gap-5 lg:gap-10 lg:w-[40%] mt-10 lg:mt-0">
              <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
                Our Mission
              </h1>
              <p className="font-medium text-richblack-300 lg:w-[95%]">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="bg-richblack-900 border-b-4 border-richblack-700 mx-auto w-[92%]"></div>

      {/* <StudyNotionStats /> */}
      {/* </div> */}

      {/* Section 5 */}
      <div className="bg-richblack-900">
        <div className="w-11/12 mt-20 mx-auto flex flex-col justify-between gap-10 text-white">
          <LearningGrid />
        </div>
      </div>

      {/* Section 6 */}
      {/* <div className='bg-richblack-900' >
        <div className='w-11/12 mt-20 mx-auto flex flex-col justify-between text-white'>
          <h2 className=' text-4xl font-semibold text-center text-richblack-5' >Get in Touch</h2>
          <p className=' text-richblack-300 text-center mt-3' >We'd love to here for you, Please fill out this form.</p>
          <div className='mx-auto mt-12'>
            <ContactUsForm />
          </div>
        </div>
      </div> */}

      <div className="bg-richblack-900 border-b-4 border-richblack-700 mx-auto w-[92%]"></div>

      {/* Section 7 - Review Section */}
      <div className="bg-richblack-900">
        <div className="w-11/12 mt-5 mx-auto flex flex-col justify-between text-white">
          <div className="mt-4">
            <h2 className="text-center text-3xl md:text-4xl font-semibold mt-4">
              Reviews from other learners
            </h2>

            {/* Reviews Slider */}
            <div className="">
              {loading ? (
                <div className="min-h-[150px] grid place-items-center">
                  <Spinner />
                </div>
              ) : (
                <div>
                  <ReviewsSlider reviews={reviews} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
