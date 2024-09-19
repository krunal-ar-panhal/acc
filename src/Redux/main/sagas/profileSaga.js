// src/redux/sagas/profileSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '../services/api';
import {
  GET_PROFILE_REQUEST,
  getProfileSuccess,
  getProfileFailure,
  UPDATE_PROFILE_REQUEST,
  updateProfileSuccess,
  updateProfileFailure,
} from '../actions/profileActions';

function* fetchProfile() {
  try {
    console.log('ss')
    const response = yield call(instance.get, '/get/profile');
    yield put(getProfileSuccess(response.data));
  } catch (error) {
    yield put(getProfileFailure(error.message));
  }
}

function* updateProfile(action) {
  try {
    const response = yield call(instance.post, '/profile/update', action.payload);
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    yield put(updateProfileFailure(error.message));
  }
}

export default function*  profileSaga() {
  yield takeLatest(GET_PROFILE_REQUEST, fetchProfile);
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfile);
}
