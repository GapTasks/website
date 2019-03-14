import { call, put, takeEvery, fork, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import {convertObjectToArray} from 'globalFns'
import {ex as gateway} from 'components/api-gateway'

const doGetTask = (payload)=>axios.get(`${gateway.baseUrl}/tasks/${payload.payload}`, {withCredentials: true})
const doSaveTask = (payload)=>axios.patch(`${gateway.baseUrl}/tasks/${payload.payload.id}`, payload.payload, {withCredentials: true})


export function* getTask(payload){
  const result = yield call(doGetTask, payload);
  yield put({type: "GOT_TASK_WITH_ID", payload: result.data.content});
}

export function* saveTask(payload){
    payload.payload.time_needed = payload.payload.months*30*24*60*60*1000 + 
    payload.payload.days*24*60*60*1000 + payload.payload.hours*60*60*1000 + 
    payload.payload.minutes*60*1000 + payload.payload.seconds*1000;
  const result = yield call(doSaveTask, payload);
  yield put({type: "SAVED_TASK_WITH_ID", payload: result.data.content});
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
      yield takeLatest("GET_TASK_WITH_ID", getTask),
      yield takeLatest("SAVE_TASK_WITH_ID", saveTask),
    ])
  }