// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/commons/LoadingIndicator";
import PrimaryButton from "../components/commons/PrimaryButton";
import HighlightedText from "../../../components/core/HomePage/HighlightedText";
import { useDispatch, useSelector } from "react-redux";
import {
  approveCertificate,
  fetchRequestsAndCertificates,
  rejectCertificate,
} from "../store/certificateActions";
import { VscCheck, VscChromeClose } from "react-icons/vsc";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { requests, certificates, isLoading } = useSelector(
    (state) => state.certificate
  );

  useEffect(() => {
    dispatch(fetchRequestsAndCertificates());
  }, []);

  // handler for approving and generating the certificate
  const handleApprove = async (certificateDetails) => {
    dispatch(approveCertificate(certificateDetails));
  };

  // handler for rejecting the certificate
  const handleReject = async (_id) => {
    dispatch(rejectCertificate(_id));
  };

  return (
    <div className="flex flex-col flex-grow justify-center">
      <div
        className={`flex flex-col items-center justify-center  md:px-8 px-4  md:pb-14 pb-12 ${
          isLoading ? "opacity-35" : ""
        }`}
      >
        <h2 className="sm:text-3xl text-xl font-semibold text-gray-800 mb-6">
        <HighlightedText text={"Pending Requests"} /> 
        </h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                Name
              </th>
              <th className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                Course
              </th>
              <th className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                Email
              </th>
              <th className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request._id}>
                  <td className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                    {request.name}
                  </td>
                  <td className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                    {request.course}
                  </td>
                  <td className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                    {request.email}
                  </td>
                  <td className="border-2 border-gray-400 text-nowrap px-2 sm:px-4 py-2">
                    <PrimaryButton
                      title=""
                      isLoading={isLoading}
                      icon={VscCheck} // Pass the icon component
                      onClick={() => {
                        handleApprove(request);
                      }}
                      style={{
                        color: "#09ed11",
                      }}
                      className={`${
                        isLoading ? "opacity-40 cursor-not-allowed" : ""
                      }  text-nowrap md:mr-4 mr-2 active:opacity-70 py-1 px-3 font-semibold rounded-md`}
                    />

                    <PrimaryButton
                      title=""
                      isLoading={isLoading}
                      icon={VscChromeClose} // Pass the icon component
                      onClick={() => {
                        handleReject(request._id);
                      }}
                      style={{
                        color: "#f70707",
                      }}
                      className={`${
                        isLoading ? "opacity-40 cursor-not-allowed" : ""
                      }  text-nowrap active:opacity-70 py-1 px-3 font-semibold rounded-md`}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="border-2 border-gray-400 px-4 py-2">
                  No Pending requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
<br />  <br /><br />
          <h2 className="sm:text-3xl text-xl font-semibold text-gray-800 mb-6">
          <HighlightedText text={"Issued Certificates"} />  
          </h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                  Name
                </th>
                <th className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                  Course
                </th>
                <th className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                  Email
                </th>
                <th className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                  Certificate Link
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {certificates.length > 0 ? (
                certificates.map((certificate) => (
                  <tr key={certificate._id}>
                    <td className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                      {certificate.name}
                    </td>
                    <td className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                      {certificate.course}
                    </td>
                    <td className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                      {certificate.email}
                    </td>
                    <td className="border-2 border-gray-400 px-2 sm:px-4 py-2">
                      <Link
                        to={certificate.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-900 hover:scale-95 transition-all duration-200 drop-shadow-[2px_2px_rgba(255,255,255,0.18)] hover:drop-shadow-none  py-1 px-4 font-semibold rounded-md"
                      >
                        View Certificate
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="border-2 border-gray-400 px-4 py-2"
                  >
                    No Certificates.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

      </div>

      {isLoading && <LoadingIndicator loadingText={"Loading..."} />}
    </div>
  );
};

export default AdminDashboard;
