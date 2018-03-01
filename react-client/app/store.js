import { applyMiddleware, compose, createStore } from "redux";
import blockchainReducer from "./containers/Main/reducer";
import createSagaMiddleware from 'redux-saga'
import mainSaga from "./containers/Main/sagas";

const sagaMiddleware = createSagaMiddleware();

const enhancers = [
  applyMiddleware(sagaMiddleware),
];

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(blockchainReducer, composeEnhancers(...enhancers));

sagaMiddleware.run(mainSaga);

export default store;
