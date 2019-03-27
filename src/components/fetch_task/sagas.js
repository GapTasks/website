import { call, put, takeEvery, fork, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import gateway from 'components/api-gateway'
import {convertObjectToArray} from 'globalFns'

const delay = (ms) => new Promise(res => setTimeout(res, ms))
const doFetchTask = (payload)=>axios.get(`${gateway.baseUrl}/search_tasks`, {params: payload, withCredentials: true})

export function* fetchTasks(payload){
  const {days, months, years, minutes, seconds, mood, name, hours} = payload.payload;
  const result = yield call(doFetchTask, {days, months, years, minutes, seconds, mood, name, hours});
  const tasks = {...result.data.content};
  payload.payload.history.push({pathname: "search_results", state:{tasks: convertObjectToArray(tasks)}});
  yield put({type: "FETCHED_TASKS", payload: {tasks: convertObjectToArray(tasks)}});

}
    
  // notice how we now only export the rootSaga
  // single entry point to start all Sagas at once
  export default function* rootSaga() {
    yield all([
      yield takeLatest("FETCH_TASKS", fetchTasks),
    ])
  }