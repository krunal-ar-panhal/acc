import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/actions';
import api from '../api/api';
import {activeListSuccess} from "../actions/actions"; // Your API utility

function* fetchEntity(action) {
  const { entity,params} = action.payload;
  try {
    const response = yield call(api.fetch, entity, params);
    yield put(actions.fetchSuccess(entity, response.data));
  } catch (error) {
    yield put(actions.fetchFailure(entity, error.response.data));
  }
}
function* detailEntity(action) {
  const { entity,id,params } = action.payload;
  try {
    const response = yield call(api.detail, entity,id,params);
    yield put(actions.editSuccess(entity, response.data));
  } catch (error) {
    yield put(actions.fetchFailure(entity, error.response.data));
  }
}
function* activeListEntity(action) {
  const { entity,params } = action.payload;
  try {
    const response = yield call(api.activeList, entity,params);
    yield put(actions.activeListSuccess(entity, response.data));
  } catch (error) {
    yield put(actions.fetchFailure(entity, error.response.data));
  }
}



function* createEntity(action) {
  const { entity, data } = action.payload;
  try {
    const response = yield call(api.create, entity, data);
    yield put(actions.createSuccess(entity, response.data));
  } catch (error) {
    // console.log(error);
    yield put(actions.createFailure(entity, error.response.data));
  }
}

function* updateEntity(action) {
  const { entity, data ,id} = action.payload;
  try {
    const response = yield call(api.update, entity, data,id);
    yield put(actions.createSuccess(entity, response.data));
  } catch (error) {
    yield put(actions.createFailure(entity, error.response.data));
  }
}

function* deleteEntity(action) {
  const { entity ,id} = action.payload;
  try {
    const response = yield call(api.delete, entity,id);
    yield put(actions.createSuccess(entity, response.data));
  } catch (error) {
    yield put(actions.createFailure(entity, error.response));
  }
}

// Similarly for updateEntity and deleteEntity

function* watchEntityRequests() {
  yield takeLatest(actionTypes.FETCH_REQUEST, fetchEntity);
  yield takeLatest(actionTypes.CREATE_REQUEST, createEntity);
  yield takeLatest(actionTypes.UPDATE_REQUEST, updateEntity);
  yield takeLatest(actionTypes.DELETE_REQUEST, deleteEntity);
  yield takeLatest(actionTypes.DETAIL_REQUEST, detailEntity);
  yield takeLatest(actionTypes.ACTIVE_LIST_REQUEST, activeListEntity);
  // Similarly for update and delete requests
}

export default watchEntityRequests;
