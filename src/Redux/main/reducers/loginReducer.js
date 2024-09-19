// reducer.js
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, LOGOUT_USER } from '../actions/actionTypes';

const initialState = {
  loading: false,
  isAuthenticated: false,
  
  // boq: null,
  data: null,
  // projectDetail: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        data: action.payload,
      };
          case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };

    // case FETCH_BOQ_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //   };
    // case FETCH_BOQ_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     boq: action.payload,
    //   };
    // case FETCH_PROJECT_DETAIL_REQUEST:
    //   return {
    //     ...state,
    //     loading: false,
    //     // projectDetail: action.payload,
    //   };
    // case FETCH_DATA_PROJECT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     projectDetail: action.payload,
    //   };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
