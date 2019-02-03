import { call, put, takeEvery, fork, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
const delay = (ms) => new Promise(res => setTimeout(res, ms))

//Need help: Braden
const doGetStacks = ()=>axios.get("http://localhost:8585/stacks", {withCredentials: true});

export function* getStacks() {
    const stacks = yield call(doGetStacks)
    yield put({ type: 'GOT_STACKS' })
  }
  


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    yield takeLatest("GET_STACKS", getStacks)
  ])
}

