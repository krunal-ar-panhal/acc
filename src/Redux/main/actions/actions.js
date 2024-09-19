// actions.js
import * as actionTypes from './actionTypes';

export const fetchRequest = (entity, params) => ({
  type: actionTypes.FETCH_REQUEST,
  payload: { entity, params },
});

export const fetchSuccess = (entity, data) => ({
  type: actionTypes.FETCH_SUCCESS,
  payload: { entity, data },
});

export const editSuccess = (entity, data) => ({
  type: actionTypes.DETAIL_SUCCESS,
  payload: { entity, data },
});

export const fetchFailure = (entity, error) => ({
  type: actionTypes.FETCH_FAILURE,
  payload: { entity, error },
});

export const createRequest = (entity, data) => ({
  type: actionTypes.CREATE_REQUEST,
  payload: { entity, data },
});

export const createSuccess = (entity, data) => ({
  type: actionTypes.CREATE_SUCCESS,
  payload: { entity, data },
});

export const createFailure = (entity, error) => ({
  type: actionTypes.CREATE_FAILURE,
  payload: { entity, error },
});

export const updateRequest = (entity, data,id) => ({
  type: actionTypes.UPDATE_REQUEST,
  payload: { entity, data ,id},
});

export const updateSuccess = (entity, data) => ({
  type: actionTypes.UPDATE_SUCCESS,
  payload: { entity, data },
});

export const updateFailure = (entity, error) => ({
  type: actionTypes.UPDATE_FAILURE,
  payload: { entity, error },
});

export const deleteRequest = (entity,id) => ({
  type: actionTypes.DELETE_REQUEST,
  payload: { entity,id},
});

export const deleteSuccess = (entity, data) => ({
  type: actionTypes.DELETE_SUCCESS,
  payload: { entity, data },
});

export const deleteFailure = (entity, error) => ({
  type: actionTypes.DELETE_FAILURE,
  payload: { entity, error },
});

// Similarly for update and delete actions
export const editRequest = (entity,id) => ({
  type: actionTypes.DETAIL_REQUEST,
  payload: { entity,id},
});
export const activeListRequest = (entity,id) => ({
    type: actionTypes.ACTIVE_LIST_REQUEST,
    payload: { entity,id},
});
export const activeListSuccess = (entity,data) => ({
    type: actionTypes.ACTIVE_LIST_SUCCESS,
    payload: { entity,data},
});
export const resetState = (entity) => ({
    type: actionTypes.RESET_STATE,
    payload: {entity},
});
