import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom';
import * as Icons1 from 'react-icons/ai'
import * as Icons2 from 'react-icons/vsc'

const SidebarLink = ({ data }) => {

  const Icon = Icons1[data.icon] || Icons2[data.icon];
  const location = useLocation();

  const matchRoute = (linkPath) => {
    return matchPath({ path: linkPath }, location.pathname);
  }

  return (
    <div>
      <Link
        to={data.path}
        className={`relative flex gap-x-2 items-center text-sm font-medium px-3 md:px-8 py-2 cursor-pointer transition-all duration-200
        ${matchRoute(data.path) ? 'bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 drop-shadow-[2px_2px_rgba(255,255,255,0.18)] hover:drop-shadow-none' : 'text-richblack-300'}`}
      >
        <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-richblack-900 ${matchRoute(data.path) ? ' opacity-100 ' : 'opacity-0'}`} >
        </span>

        <Icon className='text-lg' />
        <p className='hidden md:block'>{data.name}</p>
      </Link>
    </div>
  )
}

export default SidebarLink
