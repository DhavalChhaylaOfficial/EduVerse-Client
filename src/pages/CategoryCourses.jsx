import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCourseCategories,
  getCategoryCourses,
} from "../services/operations/courseServices";
import Spinner from "../components/common/Spinner";
import Footer from "../components/common/Footer";
import CourseSlider from "../components/core/Category/CourseSlider";
import CourseCard from "../components/core/Category/CourseCard";
import HighlightedText from "../components/core/HomePage/HighlightedText";

const CategoryCourses = () => {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryPageData, setCategoryPageData] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Find category id of categoryName
  useEffect(() => {
    const findAndSetCategoryId = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories(dispatch, navigate);
      const reqCat = categories.filter(
        (cat) =>
          cat.name.split(" ").join("-").toLowerCase() ===
          categoryName.toLowerCase()
      );

      if (reqCat.length) {
        setCategoryId(reqCat[0]._id);
      } else {
        setCategoryId("NOT_FOUND");
      }
      setLoading(false);
    };

    findAndSetCategoryId();
  }, [categoryName, dispatch, navigate]);

  // Fetch category courses data
  useEffect(() => {
    const fetchCategoryPageData = async () => {
      setLoading(true);
      const result = await getCategoryCourses(
        categoryId === "NOT_FOUND" ? null : categoryId
      );
      setCategoryPageData(result);
      setLoading(false);
    };

    if (categoryId) {
      fetchCategoryPageData();
    }
  }, [categoryId]);

  // Function to filter courses based on the search query
  const filteredCourses = categoryPageData
    ? categoryPageData.topSellingCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div>
      {(loading || (!loading && !categoryPageData)) && (
        <div className="grid place-items-center min-h-[calc(100vh-3.5rem)]">
          <Spinner />
        </div>
      )}

      {!loading && categoryPageData && (
        <div className="bg-richblack-900">
          {/* Header */}
          <div className="bg-richblack-900">
            <div className="mx-auto box-content px-10 flex flex-col gap-4 justify-center min-h-[200px] max-w-maxContentTab lg:max-w-maxContent">
              <p className="text-3xl text-richblack-5">
                {/* <HighlightedText
                  text={
                    "Category : " +
                    (categoryPageData.requestedCategory?.name || categoryName)
                  }
                /> */}
              </p>

              {/* Category Description */}
              <p className="max-w-[870px] text-richblack-200">
                {categoryPageData.requestedCategory?.description}
              </p>

              {/* Search Bar below the category title */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses"
                className="py-2 px-4 border border-richblack-400 rounded-md text-richblack-900 focus:outline-none focus:ring-2 focus:ring-custom-blue"
              />
            </div>
          </div>

          {/* Section 3: Display filtered courses */}
          <div className="box-content mx-auto px-10 py-12 max-w-maxContentTab lg:max-w-maxContent">
            <h2 className="text-2xl text-richblack-5 font-bold lg:text-4xl">
              <HighlightedText text={" Available Courses"} />

              {/* Courses in {categoryPageData.otherCategoryCourses.name} */}
            </h2>

            <div className="flex my-4 border-b border-b-richblack-600 text-sm"></div>

            <div className="py-8">
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredCourses.map((course, ind) => (
                    <CourseCard
                      course={course}
                      key={ind}
                      imgHeight={"h-[250px]"}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-richblack-200">
                  No courses found matching your search.
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default CategoryCourses;
