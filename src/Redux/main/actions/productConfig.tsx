// actions.js
import { DELETE_CATEGORY_REQUEST, EDIT_CATEGORY_REQUEST, FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_DATA_CATEGORY_LIST_SUCCESS, FETCH_PRODUCT_FAILURE, SAVE_CATEGORY_REQUEST, UPDATE_CATEGORY_REQUEST } from './actionTypes';

export const fetchDataRequest = (params: object) => ({
  type: FETCH_CATEGORY_REQUEST,
  payload:params

});

export const fetchCategoryRequest = () => ({
  type: FETCH_CATEGORY_REQUEST,

});
export const saveCategoryRequest = (params:object) => ({
  type: SAVE_CATEGORY_REQUEST,
  payload:params

});
export const updateCategoryRequest = (params:object,id:any) => ({
  type: UPDATE_CATEGORY_REQUEST,
  payload:params,
  id:id

});

export const editCategoryRequest = () => ({
  type: EDIT_CATEGORY_REQUEST,

});
export const deleteCategoryRequest = (params:any) => ({
  type: DELETE_CATEGORY_REQUEST,
  payload:params,

});


// export const logoutUser = () => ({
//   type: LOGOUT_USER,

// });
// export const fetchProjectDetailRequest = (params) => ({
//   type: FETCH_PROJECT_DETAIL_REQUEST,
//   payload:params
// });

export const fetchDataSuccess = (data:any) => ({
  type: FETCH_DATA_CATEGORY_LIST_SUCCESS,
  payload: data.data,
});
export const fetchCategorySuccess = (data:any) => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload: data.data,
});

// export const fetchDataProjectDetailSuccess = (data) => ({
//   type: FETCH_DATA_PROJECT_SUCCESS,
//   payload: data.data,
// });


export const fetchDataFailure = (error:any) => ({
  type: FETCH_PRODUCT_FAILURE,
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
