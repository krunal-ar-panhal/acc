import * as actionTypes from '../actions/actionTypes';
import {ACCESS_DENIED, ACTIVE_LIST_REQUEST, LOGIN_USER} from "../actions/actionTypes";

const initialState = {
  category: { data: null, loading: false, error: null,success:null,editData:null,activeList:null },
  product: { data: null, loading: false, error: null,success:null,editData:null,activeList:null },
  order: { data: null, loading: false, error: null,success:null,editData:null,activeList:null },
  rating: { data: null, loading: false, error: null,success:null,editData:null,activeList:null },
  attribute: { data: null, loading: false, error: null,success:null,editData:null,activeList:null },
  options: { data: null, loading: false, error: null,success:null,editData:null,activeList:null },
  coupon: { data: null, loading: false, error: null,success:null,editData:null },
  subCategory: { data: null, loading: false, error: null,success:null },
  subscribe: { data: null, loading: false, error: null,success:null },
    accessDenied: false
};

const entityReducer = (state = initialState, action) => {
  const { entity, data, error } = action.payload || {};

  switch (action.type) {
    case actionTypes.FETCH_REQUEST:
    case actionTypes.CREATE_REQUEST:
      return {
        ...state,
        [entity]: { ...state[entity], loading: true, error: null },
      };
      case actionTypes.UPDATE_REQUEST:
        return {
          ...state,
          [entity]: { ...state[entity], loading: true, error: null },
        };
      case actionTypes.DELETE_REQUEST:
        return {
          ...state,
          [entity]: { ...state[entity], loading: true, error: null },
        };

    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        [entity]: { ...state[entity], loading: false,editData:null, data },
      };
      case actionTypes.UPDATE_SUCCESS:
      case actionTypes.DELETE_SUCCESS:
    case actionTypes.CREATE_SUCCESS:
      return {
        ...state,
        [entity]: { ...state[entity], loading: false, success:data },
      };

    case actionTypes.FETCH_FAILURE:
    case actionTypes.UPDATE_FAILURE:
    case actionTypes.DELETE_FAILURE:
    case actionTypes.CREATE_FAILURE:
      return {
        ...state,
        [entity]: { ...state[entity], loading: false, error },
      };
    case actionTypes.DETAIL_REQUEST:
      return {
        ...state,
        [entity]: { ...state[entity], loading: true, error: null },
      };
    case actionTypes.DETAIL_SUCCESS:
      return {
        ...state,
        [entity]: { ...state[entity], loading: false, error: null,editData:data },
      };
    case actionTypes.ACTIVE_LIST_REQUEST:
        return {
          ...state,
          [entity]: { ...state[entity], loading: true, error: null },
        };
      case actionTypes.ACTIVE_LIST_SUCCESS:
          return {
              ...state,
              [entity]: { ...state[entity], loading: false, error: null,activeList:data },
          };
      case actionTypes.ACCESS_DENIED:
          // console.log(error)
          return {
              ...state,
              accessDenied: true,
                  [entity]: { ...state[entity], accessDenied: true ,error},
          };
      case actionTypes.LOGIN_USER:
          // console.log(error)
          return {
              ...state,
              accessDenied: false

          };
      case actionTypes.RESET_STATE:
          // console.log(error)
          return {
              ...state,
              data: null, loading: false, error: null,success:null,

          };

    default:
      return state;
  }
};

export default entityReducer;
