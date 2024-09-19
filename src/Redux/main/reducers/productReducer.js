// reducer.js
import { FETCH_DATA_CATEGORY_LIST_SUCCESS, FETCH_PRODUCT_FAILURE, FETCH_CATEGORY_REQUEST, SAVE_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, UPDATE_CATEGORY_REQUEST, DELETE_CATEGORY_REQUEST } from '../actions/actionTypes';

const initialState = {
  loading: false,  
  // boq: null,
  categoryList: null,
  success: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SAVE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryList: action.payload,
      };
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
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
    case FETCH_PRODUCT_FAILURE:
      // console.log(action.payload)
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
