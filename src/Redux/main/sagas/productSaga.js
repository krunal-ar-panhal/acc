// sagas.js
import {  call, put, takeLatest } from 'redux-saga/effects';
import {  fetchDataSuccess, fetchDataFailure, fetchCategorySuccess } from '../actions/productConfig';
import { categoryListApi, deleteCategoryApi, saveCategoryApi, updateCategoryApi } from '../api/productApi';
import {  DELETE_CATEGORY_REQUEST, FETCH_CATEGORY_REQUEST, FETCH_DATA_REQUEST, SAVE_CATEGORY_REQUEST, UPDATE_CATEGORY_REQUEST } from '../actions/actionTypes';

// import https from 'https';
function* fetchCategoryDetail(action) {
  try {
    
    // yield put(fetchDataRequest()); // Dispatch action to indicate the start of data fetching
    const data = yield call(categoryListApi,action.payload); // Call the API function to fetch data
    // console.log(data)
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

export function* watchFetchData() {
  // console.log('wath')
  yield takeLatest(FETCH_DATA_REQUEST, fetchDataSaga);
}

function* fetchCategoryList() {
  try {
    // yield put(fetchDataRequest()); // Dispatch action to indicate the start of data fetching
    const data = yield call(categoryListApi); // Call the API function to fetch data
    // console.log(data)
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

export function* watchCategoryListData() {
  // console.log('wath')
  yield takeLatest(FETCH_CATEGORY_REQUEST, fetchCategoryList);
}

// Define the URL endpoint
    


function* saveCategoryData(action) {
  try {
    
    // yield put(fetchDataRequest()); // Dispatch action to indicate the start of data fetching
    const data = yield call(saveCategoryApi,action.payload); // Call the API function to fetch data
    // console.log(data)
    yield put(fetchCategorySuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}
function* updateCategoryData(action) {
  try {
    
    // yield put(fetchDataRequest()); // Dispatch action to indicate the start of data fetching
    const data = yield call(updateCategoryApi,action.payload,action.id); // Call the API function to fetch data
    // console.log(data)
    yield put(fetchCategorySuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}
function* deleteCategoryData(action) {
  try {
    
    // yield put(fetchDataRequest()); // Dispatch action to indicate the start of data fetching
    const data = yield call(deleteCategoryApi,action.payload); // Call the API function to fetch data
    // console.log(data)
    yield put(fetchCategorySuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

export function* watchSaveCategoryData() {
  // console.log('wath')
  yield takeLatest(SAVE_CATEGORY_REQUEST, saveCategoryData);
}
export function* watchUpdateCategoryData() {
  // console.log('wath')
  yield takeLatest(UPDATE_CATEGORY_REQUEST, updateCategoryData);
}
export function* watchDeleteCategoryData() {
  // console.log('wath')
  yield takeLatest(DELETE_CATEGORY_REQUEST, deleteCategoryData);
}
