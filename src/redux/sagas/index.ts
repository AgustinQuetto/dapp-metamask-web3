import { all } from "redux-saga/effects";

import manager from "./manager";

export default function* rootSaga() {
  yield all([manager()]);
}
