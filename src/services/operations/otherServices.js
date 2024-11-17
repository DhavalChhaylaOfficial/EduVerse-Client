import { toast } from "react-hot-toast"
import { categoriesApi, reviewApi } from "../apis";
import { apiConnector } from "../apiConnector";

// Get all reviews
export const getAllReviews = async () => {
  let result = [];
  try {
    const response = await apiConnector('GET', reviewApi.GET_GET_ALL_REVIEWS_API);
    result = response.data?.data;
  } catch (error) {
    toast.error('Could not fetch course reviews, Refresh the page');
  }
  return result
}

// Get all Categories
export const getAllCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector('GET', categoriesApi.GET_GET_ALL_CATEGORIES_API);
    result = response.data?.data;
  } catch (error) {
    toast.error('Could not fetch course categories, Refresh the page');
  }
  return result
}

// Create a new category
export const createCategory = async (categoryData, token) => {
  try {
    const response = await apiConnector(
      'POST',
      categoriesApi.POST_GET_CREATE_CATEGORY_API, // Adjust endpoint here
      categoryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Category created successfully!");
    return response.data;
  } catch (error) {
    toast.error('Failed to create category, Please try again');
    return { success: false, error: error.response?.data?.message || 'Failed to create category' };
  }
};
