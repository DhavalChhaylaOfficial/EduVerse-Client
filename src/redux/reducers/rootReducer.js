import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import cartReducer from '../slices/cartSlice';
import addCourseReducer from '../slices/addCourseSlice';
import viewCourseReducer from '../slices/viewCourseSlice';
import certificateReducer from '../../pages/Certificate/store/certificateSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  addCourse: addCourseReducer,
  viewCourse: viewCourseReducer,
  certificate: certificateReducer
});

export default rootReducer;
