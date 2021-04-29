import { /* put, call,  */ takeLatest } from "redux-saga/effects";
import { GET_BALANCE } from "../actions";

function* getBalance({ payload }: any) {
  try {
    console.log("listening get balance saga");
    yield;
  } catch (e) {
    console.error(e);
  }
}

export default function* manager() {
  yield takeLatest(GET_BALANCE, getBalance);
}
