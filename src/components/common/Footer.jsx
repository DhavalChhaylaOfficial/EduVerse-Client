import React from "react";
import footerLinks from "../../data/footerLinks";
import FooterCard from "./FooterCard";

import { Link } from "react-router-dom";
import logo from "../../assets/Logo/evuverseLogo1.png";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
  const section2 = [];
  for (let i = 5; i <= 7; i++) {
    section2.push(
      <div key={i} className="w-[48%] lg:w-[30%]">
        <FooterCard data={footerLinks[i]} />
      </div>
    );
  }

  return (
    <div className="bg-richblack-800 mx-7 rounded-3xl mb-6">
      <div className="flex flex-col  text-white w-11/12 max-w-maxContent mx-auto ">
        {/* Bottom section */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-richblack-400 text-sm py-5">
          {/* Links section (left side) */}
          <div className="flex flex-row">
            {BottomFooter.map((ele, ind) => {
              return (
                <Link to={ele.split(" ").join("-").toLowerCase()} key={ind}>
                  <div
                    className={`cursor-pointer hover:text-richblack-50 transition-all duration-200 px-3 
                        ${
                          ind !== BottomFooter.length - 1
                            ? " border-r border-richblack-700 "
                            : ""
                        }`}
                  >
                    {ele}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Logo section (centered) */}
          <div className="flex justify-center w-[48%] lg:w-[17%]">
            <Link to={"/"}>
              <img
                src={logo}
                alt="logo"
                className="object-contain m-0 p-0 block"
              />
            </Link>
          </div>

          {/* Rights Reserved section (right side) */}
          <div className="text-right w-full lg:w-auto">
            &copy; Eduverse | E-Learning Portal 2024. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
