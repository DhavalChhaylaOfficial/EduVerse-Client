import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/apiService";
import sweetAlert from "../utils/sweetAlert";

// Async thunk for requesting a certificate
export const requestCertificate = createAsyncThunk(
  "certificate/requestCertificate",
  async ({ name, course, email }, { rejectWithValue }) => {
    try {
      const response = await api.post("/certificates/request", {
        name,
        course,
        email,
      });
      sweetAlert({
        text: "Your certificate request has been submitted successfully.",
      });
      return response.data;
    } catch (error) {
      sweetAlert({
        title: "Error!",
        text: error.response.data.error,
        icon: "error",
      });
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Async thunk for fetching certificate requests
export const fetchRequests = createAsyncThunk(
  "certificate/fetchRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/certificates/requests");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Async thunk for fetching requests and certificates
export const fetchRequestsAndCertificates = createAsyncThunk(
  "certificate/fetchRequestsAndCertificates",
  async (_, { rejectWithValue }) => {
    try {
      const [requestsRes, certificatesRes] = await Promise.all([
        api.get("/certificates/requests"),
        api.get("/certificates/all"),
      ]);
      return { requests: requestsRes.data, certificates: certificatesRes.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Async thunk for approving and generating a certificate
// Async thunk for approving and generating a certificate
export const approveCertificate = createAsyncThunk(
  "certificate/approveCertificate",
  async (certificateDetails, { dispatch, rejectWithValue }) => {
    const { _id, name, course, email } = certificateDetails;
    try {
      // Prepare the data to send for certificate generation
      const generateCertificate = {
        name,
        course,
        email,
        approvalDate: new Date(),
      };

      // Call the backend to generate and approve the certificate
      const response = await api.put(`/certificates/create/${_id}`, generateCertificate);

      // Show success alert (this can be a toast or sweetalert)
      sweetAlert({ text: "Certificate generated successfully and email sent!" });

      // Dispatch fetchRequestsAndCertificates to update both requests and certificates
      await dispatch(fetchRequestsAndCertificates());

      return response.data;
    } catch (error) {
      // Show error alert if something went wrong
      sweetAlert({
        title: "Error!",
        text: error.response?.data?.error || "An error occurred while approving the certificate.",
        icon: "error",
      });
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Async thunk for rejecting a certificate
export const rejectCertificate = createAsyncThunk(
  "certificate/rejectCertificate",
  async (_id, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/certificates/reject/${_id}`);
      sweetAlert({ text: "Certificate request rejected." });
      // Dispatch fetchRequests to update requests
      await dispatch(fetchRequests());
    } catch (error) {
      sweetAlert({
        title: "Error!",
        text: error.response.data.error,
        icon: "error",
      });
      return rejectWithValue(error.response?.data?.error);
    }
  }
);
