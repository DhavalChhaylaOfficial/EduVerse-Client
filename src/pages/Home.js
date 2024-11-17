import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import HighlightedText from "../components/core/HomePage/HighlightedText";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import CTAButton from "../components/core/HomePage/CTAButton";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Banner from "../assets/Images/Slider_Video.mp4";
import Footer from "../components/common/Footer";
import ReviewsSlider from "../components/common/ReviewsSlider";
import Spinner from "../components/common/Spinner";
import { getAllReviews } from "../services/operations/otherServices";
import { MdOutlineRateReview } from 'react-icons/md'

const Home = () => {
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
    <div className=" bg-richblack-900 flex flex-col font-inter min-h-screen w-screen">
      {/* Section 1 - Black color section */}
      <div className="bg-richblack-900">
        <div className=" relative mx-auto flex flex-col items-center justify-between  w-11/12 max-w-maxContent text-white gap-8">
          <div></div>

          <div className="text-4xl text-center font-semibold">
            Empower Your Future with
            <HighlightedText text={"EduVerse!"} />
          </div>

          <div className="-mt-3 w-11/12 text-center text-lg text-richblack-300 font-bold">
            <p className="">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.
            </p>
          </div>

          <div className="mt-8 flex flex-row gap-7">
            <CTAButton active={true} linkto={"/categorycourses/AI"}>
              Get Started
            </CTAButton>

            {/* <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton> */}
          </div>

          <div className="mx-3 my-7 transition-all duration-200 shadow-[10px_-5px_50px_-5px] shadow-blue-200 rounded-3xl overflow-hidden">
            <video
              className="w-[1100px] h-[600px] object-fill"
              muted
              loop
              autoPlay
              src={Banner}
            />
          </div>

          {/* Code Section 1 */}
          <div>
            <CodeBlocks
              flexDir={"lg:flex-row"}
              heading={
                <div className="text-4xl font-semibold text-white">
                  {/* Unlock Your
                  <HighlightedText text={"coding potential"} /> with our online courses. <br />  */}
                  <HighlightedText text = {"Apply for Top MNC's"}/> to Put Your Skills into Action
                </div>
              }
              subHeading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              ctaBtn1={{
                btnText: "Apply Here",
                linkto: "https://docs.google.com/spreadsheets/d/1a0_P5Wcf3YTePSlqoxP9fPldDEFyMrW1pFKxF3Xin34/edit?usp=sharing"  ,
                active: true,
                newTab: true, // Opens in a new tab
              }}
              ctaBtn2={{
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: false,
                newTab: false, // Opens in the same tab
              }}
              codeText={`<!DOCTYPE html>\n<html lang="en">\n\t<head>\n\t\t<title>This is myPage</title>\n\t</head>\n\t<body>\n\t\t<h1> <a href="/">Header</a> </h1>\n\t\t<nav>\n\t\t\t<a href="/one">One</a>\n\t\t\t<a href="/two">Two</a>\n\t\t\t<a href="/three">Three</a>\n\t\t</nav>\n\t</body>\n</html>`}
              codeColor="text-yellow-25"
              noOfLines={14}
              codeBlockId={"codeblock1"}
            />
          </div>

          {/* Code Section 2 */}
          <div>
            <CodeBlocks
              flexDir={"lg:flex-row-reverse"}
              heading={
                <div className="text-4xl w-full md:w-[60%] font-semibold text-white">
                  Start
                  <HighlightedText text={"coding in seconds"} />
                </div>
              }
              subHeading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              ctaBtn1={{
                btnText: "Try it Yourself",
                linkto: "/compile",
                active: true,
                newTab: true, // Opens in a new tab
              }}
              ctaBtn2={{
                btnText: "Continue Lesson",
                linkto: "/login",
                active: false,
                newTab: false, // Opens in the same tab
              }}
              codeText={`import CTAButton from './CTAButton';\nimport TypeAnimation from 'react-router-dom';\nimport { FaArrowRight } from 'react-icons/fa';\n\nconst Home = () => {\n\treturn (\n\t\t<div>Home</div>\n\t)\n}\n\nexport default Home`}
              codeColor="text-white"
              noOfLines={11}
              codeBlockId={"codeblock2"}
            />
          </div>

          {/* Unlock the power of code */}
          {/* <ExploreMore /> */}
        </div>
      </div>

      {/* Section 2 - White color section */}
      <div className="bg-pure-greys-5 text-richblue-700">
        {/* <div className="homepage_bg h-[150px] md:h-[320px]">
          <div className="w-11/12 pt-[50px] md:pt-[200px] max-w-maxContent mx-auto flex justify-center">
            <div className="flex flex-row gap-7">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex flex-row items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/login"}>
                <div className="text-white">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div> */}

        <div className="flex flex-col max-w-maxContent w-11/12 mt-5 md:mt-10 lg:mt-16 mx-auto gap-8 items-center justify-between">
          <div className="flex flex-row mb-10 justify-between gap-10">
            <div className="text-4xl font-semibold w-[45%]">
              Get the skills you need for a
              <HighlightedText text="job that is in demand." />
            </div>

            <div className="flex flex-col gap-10 w-[40%] items-start">
              <p>
                The modern EduVerse is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CTAButton active={true} linkto={"/about"}>
                Learn More
              </CTAButton>
            </div>
          </div>

          <TimelineSection />
          {/* <LearningLanguageSection /> */}
        </div>
      </div>

      {/* Section 3 - Black color section */}
      <div className="bg-richblack-900">
        <div className="w-11/12 mt-20 flex flex-col mx-auto max-w-maxContent items-center justify-between gap-8 text-white">
          {/* Instructor section */}
          <InstructorSection />

          {/* Review section */}
          <div>
          <h1 className="text-center text-3xl lg:text-4xl font-semibold mt-8 flex justify-center items-center gap-x-3">
                        Reviews from other learners  <MdOutlineRateReview className='' style={{color : "#00e1ff"}} />
                    </h1>

            {/* Review slider */}
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

      {/* Section 4 - Footer section */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
