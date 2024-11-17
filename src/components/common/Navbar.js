import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Edu_logo.png";
import navbarLinks from "../../data/navbarLinks";
import { Link, matchPath, useNavigate } from "react-router-dom";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useLocation } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineHome,
  AiOutlineContacts,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { toast } from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import HamburgerMenu from "./HamburgerMenu";
import { VscDashboard, VscSignOut, VscSignIn } from "react-icons/vsc";
import { logout } from "../../services/operations/authServices";
import { BiCategory, BiDetail } from "react-icons/bi";
import { getAllCategories } from "../../services/operations/otherServices";
import { getCurrentUser } from "../../services/operations/profileServices";
import { setLoading } from "../../redux/slices/authSlice";

const Navbar = () => {
  const { token, loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cartItemsCount } = useSelector((state) => state.cart);
  const [loading2, setLoading2] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [catalogs, setCatalogs] = useState([]);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
    const fetchCatalog = async () => {
      const toastId = toast.loading("Loading Backend ...");
      const result = await getAllCategories();
      if (result) {
        setCatalogs(result);
      } else {
        toast.error("Failed to load backend");
      }
      toast.dismiss(toastId);
      setLoading2(false);
    };
    fetchCatalog();
  }, []);

  useEffect(() => {
    const getCurrentUserDetails = async () => {
      dispatch(setLoading(true));
      if (token) {
        await getCurrentUser(token, dispatch, navigate);
      }
      dispatch(setLoading(false));
    };
    getCurrentUserDetails();
  }, [token, dispatch, navigate]);

  const matchRoute = (linkPath) => {
    if (linkPath === "/")
      return matchPath({ path: linkPath }, location.pathname);
    return location.pathname.startsWith(linkPath);
  };

  const handleLogOutClick = async (e) => {
    setIsMenuModalOpen(false);
    await logout(token, dispatch, navigate);
  };

  return (
    <div className="bg-richblack-800 border-b border-b-richblack-500 h-20">
      <div className="w-11/12 h-20 mx-auto max-w-maxContent flex flex-row items-center justify-between">
        {/* Logo */}
        <div>
          <Link to={"/"}>
            <img src={logo} width={180} height={60} loading="lazy" alt="logo" />
          </Link>
        </div>

       {/* Nav Links */}
<div className="">
  <nav className="hidden md:block">
    <ul className="flex gap-x-6 text-richblack-25">
      {navbarLinks.map((link, ind) => (
        <li key={ind}>
          {link.title === "Courses" ? (
            // Replace the dropdown with a simple link for "Courses"
            <Link to={link?.path} className="relative group">
              <p
                className={`${
                  matchRoute(link?.path)
                    ? "bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent"
                    : "text-richblack-25"
                }`}
              >
                {link.title}
              </p>
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] transition-all duration-300 group-hover:w-full" />
            </Link>
          ) : (
            <Link to={link?.path} className="relative group">
              <p
                className={`${
                  matchRoute(link?.path)
                    ? "bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent"
                    : "text-richblack-25"
                }`}
              >
                {link.title}
              </p>
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] transition-all duration-300 group-hover:w-full" />
            </Link>
          )}
        </li>
      ))}
    </ul>
  </nav>
</div>

        {/* Login / SignUp / DashBoard / Cart */}
        <div className="hidden md:flex gap-x-4 items-center">
          {(loading || loading2) && (
            <div className="text-white font-bold">Loading ...</div>
          )}
          {token === null && (
            <Link to={"/login"}>
              <button 
              className="px-3 py-2 rounded-md font-medium bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 drop-shadow-[2px_2px_rgba(255,255,255,0.18)] hover:drop-shadow-none">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to={"/signup"}>
              <button 
              className="px-3 py-2 rounded-md font-medium bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 drop-shadow-[2px_2px_rgba(255,255,255,0.18)] hover:drop-shadow-none">
              {/* className="border border-richblack-700 bg-richblack-800 text-richblack-100 rounded-md px-3 py-2 hover:bg-gradient-to-b hover:from-[#1FA2FF] hover:via-[#12D8FA] hover:to-[#A6FFCB] hover:text-richblack-900 transition-all duration-200"> */}
                Sign Up
              </button>
            </Link>
          )}

          {user && user?.role === "Student" && (
            <Link to={"/dashboard/cart"} className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {cartItemsCount > 0 && (
                <span className="absolute text-custom-blue text-center text-xs font-bold bg-richblack-600 h-5 w-5 -bottom-2 -right-2 grid place-items-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>

        {/* HamberBurger Menu - only for small screen */}
        <div className="mr-4 md:hidden">
          <GiHamburgerMenu
            onClick={() => setIsMenuModalOpen((prev) => !prev)}
            className={` fill-richblack-100 `}
            fontSize={24}
          />

          <HamburgerMenu
            isMenuModalOpen={isMenuModalOpen}
            setIsMenuModalOpen={setIsMenuModalOpen}
          >
            <div className="flex flex-col gap-y-2 py-5 px-5">
              {(loading || loading2) && (
                <div className="text-white font-bold">Loading ...</div>
              )}

              {token === null && (
                <Link to={"/login"} onClick={() => setIsMenuModalOpen(false)}>
                  <div className="flex gap-x-2 items-center w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 ">
                    <VscSignIn className="text-lg" />
                    Log In
                  </div>
                </Link>
              )}

              {token === null && (
                <Link to={"/signup"} onClick={() => setIsMenuModalOpen(false)}>
                  <div className="flex gap-x-2 items-center w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 ">
                    <AiOutlineLogin className="text-lg" />
                    Sign Up
                  </div>
                </Link>
              )}

              {token !== null && (
                <Link
                  to={"/dashboard/my-profile"}
                  onClick={() => setIsMenuModalOpen(false)}
                >
                  <div className="flex gap-x-2 items-center w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 ">
                    <VscDashboard className="text-lg" />
                    Dashboard
                  </div>
                </Link>
              )}

              {token !== null && user && user?.role === "Student" && (
                <Link
                  to={"/dashboard/cart"}
                  onClick={() => setIsMenuModalOpen(false)}
                >
                  <div className="flex gap-x-2 items-center w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 ">
                    <AiOutlineShoppingCart className="text-lg" />
                    Cart
                  </div>
                </Link>
              )}

              {token !== null && (
                <div
                  className="flex gap-x-2 items-center w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 cursor-pointer"
                  onClick={handleLogOutClick}
                >
                  <VscSignOut className="text-lg" />
                  LogOut
                </div>
              )}

              {/* General Buttons */}
              <div className="h-[1px] my-2 bg-richblack-100 w-3/4 mx-auto"></div>

              <Link to={"/"} onClick={() => setIsMenuModalOpen(false)}>
                <div className="flex gap-x-2 items-center w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 ">
                  <AiOutlineHome className="text-lg" />
                  Home
                </div>
              </Link>

              <Link to={"/about"} onClick={() => setIsMenuModalOpen(false)}>
                <div className="flex gap-x-2 items-center w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 ">
                  <BiDetail className="text-lg" />
                  About Us
                </div>
              </Link>

              <Link to={"/contact"} onClick={() => setIsMenuModalOpen(false)}>
                <div className="flex gap-x-2 items-center w-full py-2 px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 ">
                  <AiOutlineContacts className="text-lg" />
                  Contact Us
                </div>
              </Link>

              {/* Category */}
              <div
                className=""
                onClick={() => setCategoryOpen((prev) => !prev)}
              >
                <details>
                  <summary className="flex gap-x-2 items-center w-full py-2 px-3 text-richblack-100 ">
                    <BiCategory className="text-lg" />
                    Category
                    {categoryOpen ? (
                      <SlArrowUp className="translate-y-[1px] ml-auto mr-1" />
                    ) : (
                      <SlArrowDown className="translate-y-[1px] ml-auto mr-1" />
                    )}
                  </summary>

                  <div className="px-4 text-richblack-100">
                    {catalogs.length ? (
                      <div className="flex flex-col capitalize">
                        {catalogs.map((catalog, index) => (
                          <Link
                            to={`/categorycourses/${catalog.name
                              .split(" ")
                              .join("-")}`}
                            key={index}
                            onClick={() => setIsMenuModalOpen(false)}
                          >
                            <p className=" rounded-lg py-2 pl-4">
                              {catalog.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg py-2 pl-4 select-none cursor-not-allowed">
                        No Catalog Available
                      </div>
                    )}
                  </div>
                </details>
              </div>
            </div>
          </HamburgerMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
