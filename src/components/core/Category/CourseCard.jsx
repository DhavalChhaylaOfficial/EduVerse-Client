import React from 'react'
import RatingStars from '../../common/RatingStars'
import { Link } from 'react-router-dom'

const CourseCard = ({ course, imgHeight }) => {
  return (
    <Link to={`/course/${course._id}`} >
      <div className="rounded-lg shadow-lg border border-richblack-700 p-2 max-w-xs transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:border-richblack-500">
        <div className="rounded-lg overflow-hidden">
          <img
            src={course.thumbnail}
            alt="course-thumbnail"
            className={`${imgHeight || 'h-[200px]'} object-cover w-full rounded-lg`}
          />
        </div>

        <div className="flex flex-col gap-1 p-2">
          <p className="text-lg font-semibold text-richblack-5 truncate">{course.title}</p>
          <p className="text-xs text-richblack-50">{course.instructor.firstName} {course.instructor.lastName}</p>
          <div className="flex items-center gap-1">
            <p className="" style={{color : "#00e1ff"}}>{course.averageRating}</p>
            <RatingStars rating={course.averageRating} />
            <p className="text-xs text-richblack-400">{course.reviews.length} Ratings</p>
          </div>
          <p className="text-lg font-medium text-richblack-5">₹ {course.price}</p>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
