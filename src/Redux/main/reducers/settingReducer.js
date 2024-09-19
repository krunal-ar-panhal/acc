// src/redux/reducers/settingReducer.js

import {
    GET_SETTING_REQUEST,
    GET_SETTING_SUCCESS,
    GET_SETTING_FAILURE,
    UPDATE_SETTING_REQUEST,
    UPDATE_SETTING_SUCCESS,
    UPDATE_SETTING_FAILURE,
  } from '../actions/settingActions';
  
  const initialState = {
    setting: null,
    success: null,
    loading: false,
    error: null,
  };
  
  const settingReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SETTING_REQUEST:
      case UPDATE_SETTING_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_SETTING_SUCCESS:
        return {
          ...state,
          setting: action.payload,
          loading: false,
          error: null,
          success: null,
        };
      case UPDATE_SETTING_SUCCESS:
        return {
          ...state,
          success:action.payload,
          // setting: action.payload,
          loading: false,
          error: null,
        };
      case GET_SETTING_FAILURE:
      case UPDATE_SETTING_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          success:null
        };
      default:
        return state;
    }
  };
  
  export default settingReducer;
  