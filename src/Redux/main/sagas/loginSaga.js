// sagas.js
import {  call, put, takeLatest } from 'redux-saga/effects';
import {fetchDataSuccess, fetchDataFailure, loggedInSuccess} from '../actions/loginConfig';
import { loginAPI } from '../api/loginApi';
import {  FETCH_DATA_REQUEST } from '../actions/actionTypes';

// import https from 'https';
function* fetchDataSaga(action) {
  try {

    // yield put(fetchDataRequest()); // Dispatch action to indicate the start of data fetching
    const data = yield call(loginAPI,action.payload); // Call the API function to fetch data
    // console.log(data)
    yield put(loggedInSuccess(data));
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

export function* watchFetchData() {
  // console.log('wath')
  yield takeLatest(FETCH_DATA_REQUEST, fetchDataSaga);
}
// export function* watchLogout() {
  // console.log('wath')

  // yield takeLatest(LOGOUT_USER, call(logoutAPI));

// }

  // try {
  //   const response = yield axios.post(
  //     'https://awscpwdqpo02.cpwdcld.net:50001/RESTAdapter/NIT_MASTER_DATA',
  //     {
  //       "ED_SENDER_NIT_MASTERDATA_REQUEST": {
  //           "PROJECT_PACKAGE_MASTER_DATA": ""
  //       }
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Basic ${btoa('RESTUSER:Sxzaqw@1234')}`, // Basic authentication
  //       },
  //     }
  //   );
  //   // const response = yield call(axios.get, 'https://example.com/api/data');
  //   yield put(fetchDataSuccess(response.data));
  // } catch (error) {
  //   yield put(fetchDataFailure(error.message));
  // }


// Define the URL endpoint



