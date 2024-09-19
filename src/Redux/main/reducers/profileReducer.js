// src/redux/reducers/profileReducer.js

import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_IMAGE,
  } from '../actions/profileActions';
  
  const initialState = {
    profile: null,
    profileImage: null,
    loading: false,
    error: null,
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PROFILE_REQUEST:
      case UPDATE_PROFILE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_PROFILE_SUCCESS:
      case UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          profile: action.payload,
          loading: false,
          error: null,
        };
      case GET_PROFILE_FAILURE:
      case UPDATE_PROFILE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case UPDATE_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.payload, // Update profile image
      };
      default:
        return state;
    }
  };
  
  export default profileReducer;
  