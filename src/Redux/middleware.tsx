// redux/middleware.ts

import { Middleware } from '@reduxjs/toolkit';
import { ACCESS_DENIED, FETCH_FAILURE } from './main/actions/actionTypes'; // Import your action type constants

const middleware: Middleware = (store) => (next) => (action: any) => {
  // Check if the action payload contains the error property
  if (action && action.payload && action.payload.error && action.payload.error.responseCode === 403) {
    // Dispatch an action indicating access denied
    store.dispatch({ type: ACCESS_DENIED, payload: action.payload.error });

    // Optionally, dispatch FETCH_FAILURE action as well
    // store.dispatch({ type: FETCH_FAILURE, payload: action.payload.error });

    // Return the error payload
    return action.payload.error;
  }

  return next(action);
};

export default middleware;
