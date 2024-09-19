import { configureStore } from '@reduxjs/toolkit';
import LanguageReducer from "./LanguageReducer";
import LayoutReducer from "./LayoutReducer";
import rootReducer from './main/rootReducer'; // Your Redux reducers
// import createSagaMiddleware from 'redux-saga';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './main/rootSaga';
import middleware from "./middleware";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    LayoutReducer: LayoutReducer,
    LangReducer: LanguageReducer,
    rootReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
    }).concat(sagaMiddleware,middleware),

  // middleware: (sagaMiddleware) => sagaMiddleware(),

  // middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga); // Run the root saga

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

