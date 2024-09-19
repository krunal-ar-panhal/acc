// src/redux/actions/profileActions.js

export const GET_SETTING_REQUEST = 'GET_SETTING_REQUEST';
export const GET_SETTING_SUCCESS = 'GET_SETTING_SUCCESS';
export const GET_SETTING_FAILURE = 'GET_SETTING_FAILURE';

export const UPDATE_SETTING_REQUEST = 'UPDATE_SETTING_REQUEST';
export const UPDATE_SETTING_SUCCESS = 'UPDATE_SETTING_SUCCESS';
export const UPDATE_SETTING_FAILURE = 'UPDATE_SETTING_FAILURE';

export const getSettingRequest = () => ({
  type: GET_SETTING_REQUEST,
});

export const getSettingSuccess = (profile) => ({
  type: GET_SETTING_SUCCESS,
  payload: profile,
});

export const getSettingFailure = (error) => ({
  type: GET_SETTING_FAILURE,
  payload: error,
});

export const updateSettingRequest = (profileData) => ({
  type: UPDATE_SETTING_REQUEST,
  payload: profileData,
});

export const updateSettingSuccess = (profile) => ({
  type: UPDATE_SETTING_SUCCESS,
  payload: profile,
});

export const updateSettingFailure = (error) => ({
  type: UPDATE_SETTING_FAILURE,
  payload: error,
});
