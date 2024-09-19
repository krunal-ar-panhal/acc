// sagas.js

import {  all } from 'redux-saga/effects';
import {  watchFetchData } from './sagas/loginSaga';
import watchEntityRequests from './sagas/sagas';
import {  watchCategoryListData, watchDeleteCategoryData, watchSaveCategoryData, watchUpdateCategoryData } from './sagas/productSaga';
import profileSaga from './sagas/profileSaga';
import settingSaga from './sagas/settingSaga';
// function* exampleSaga(action) {
//   try {
//     // Perform asynchronous operations here, e.g., API calls
//     // const data = yield call(fetchData);;'
//     const fetchData=1;
//     const data = yield call(fetchData);

//     yield put({ type: 'EXAMPLE_ACTION', payload: data });
//   } catch (error) {
//     // Handle errors here
//   }
// }

export default function* rootSaga() {
  // yield takeEvery('SOME_TRIGGERING_ACTION', exampleSaga);
  // yield takeEvery('SOME_TRIGGERING_ACTION', exampleSaga);
  yield all([
    watchFetchData(),
    watchCategoryListData(),
    watchSaveCategoryData(),
    watchUpdateCategoryData(),
    watchDeleteCategoryData(),
    watchEntityRequests(),
    profileSaga(),
    settingSaga(),
    // watchLogout()
    // watchProjectData(),
    // watchBoqFetchData()
    // Add more sagas here if needed
  ]);

  // Add more sagas here if needed
}
