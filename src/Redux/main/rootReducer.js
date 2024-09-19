// reducers.js

import { combineReducers } from 'redux';
import loginReducer from './reducers/loginReducer';
import profileReducer from './reducers/profileReducer';
import settingReducer from './reducers/settingReducer';
import entityReducer from './reducers/reducers';
// function exampleReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'EXAMPLE_ACTION':
//       return { ...state, data: action.payload };
//     default:
//       return state;
//   }
// }

const rootReducer = combineReducers({
  // example: exampleReducer,
  auth : loginReducer,
  // product :productReducer,
  entities: entityReducer,
  uProfile: profileReducer,
  settings: settingReducer,

  // configStep6 :
  // Add more reducers here if needed
});

export default rootReducer;
