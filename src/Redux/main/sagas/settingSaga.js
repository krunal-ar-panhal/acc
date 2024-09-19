// src/redux/sagas/profileSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '../services/api';
import {
  GET_SETTING_REQUEST,
  getSettingSuccess,
  getSettingFailure,
  UPDATE_SETTING_REQUEST,
  updateSettingSuccess,
  updateSettingFailure,
} from '../actions/settingActions';

function* fetchSetting() {
  try {
    const response = yield call(instance.get, '/get/siteSettings');
    yield put(getSettingSuccess(response.data));
  } catch (error) {
    yield put(getSettingFailure(error.message));
  }
}

function* updateSetting(action) {
  try {
    const response = yield call(instance.post, '/update/siteSettings', action.payload);
    yield put(updateSettingSuccess(response.data));
  } catch (error) {
    yield put(updateSettingFailure(error.message));
  }
}

export default function* profileSaga() {
  yield takeLatest(GET_SETTING_REQUEST, fetchSetting);
  yield takeLatest(UPDATE_SETTING_REQUEST, updateSetting);
}
