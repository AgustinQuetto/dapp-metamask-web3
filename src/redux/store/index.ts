import { createStore, applyMiddleware } from "redux";
import reduxSaga from "redux-saga";
import rootSaga from "../sagas";

function reducers() {
  return {
    balance: 0,
  };
}

const sagaMiddleware = reduxSaga();

const store = () => ({
  ...createStore(reducers, applyMiddleware(sagaMiddleware)),
  runSaga: sagaMiddleware.run(rootSaga),
});

export default store;
