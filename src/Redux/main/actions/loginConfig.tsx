// actions.js
import {FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, LOGOUT_USER, LOGIN_USER} from './actionTypes';

export const fetchDataRequest = (params: any) => ({
  type: FETCH_DATA_REQUEST,
  payload:params

});

// export const logoutUser = () => ({
//   type: LOGOUT_USER,

// });
// export const fetchProjectDetailRequest = (params) => ({
//   type: FETCH_PROJECT_DETAIL_REQUEST,
//   payload:params
// });

export const fetchDataSuccess = (data:any) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data.data,
});
export const loggedInSuccess = (data:any) => ({
  type: LOGIN_USER,
  payload: data.data,
});
// export const fetchDataProjectDetailSuccess = (data) => ({
//   type: FETCH_DATA_PROJECT_SUCCESS,
//   payload: data.data,
// });


export const fetchDataFailure = (error:any) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});
// export const fetchBOQRequest = (params) => ({
//   type: FETCH_BOQ_REQUEST,
//   payload:params
// });

// export const fetchBOQSuccess = (data) => ({
//   type: FETCH_BOQ_SUCCESS,
//   payload: data.data,
// });

export type FetchDataRequestAction = ReturnType<typeof fetchDataRequest>;
export type FetchDataSuccessAction = ReturnType<typeof fetchDataSuccess>;
export type FetchDataFailureAction = ReturnType<typeof fetchDataFailure>;
// export type LogoutUserAction = ReturnType<typeof logoutUser>;
// export type GetDataAction = ReturnType<typeof getData>;
