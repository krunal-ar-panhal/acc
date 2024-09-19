// // store.js

// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import { all } from 'redux-saga/effects';
// import { composeWithDevTools } from 'redux-devtools-extension';

// import rootReducer from './rootReducer'; // Your Redux reducers
// import rootSaga from './rootSaga'; // Your Saga root

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleware))
// );

// sagaMiddleware.run(function* () {
//   yield all([
//     rootSaga(),
//     // Additional sagas can be added here
//   ]);
// });

// export default store;
// store.js

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer'; // Your Redux reducers
import rootSaga from './rootSaga'; // Your Saga root

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga); // Run the root saga

export default store;

