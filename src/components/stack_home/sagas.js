import { call, put, takeEvery, fork, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import {convertObjectToArray} from 'globalFns'
import gateway from 'components/api-gateway'
const delay = (ms) => new Promise(res => setTimeout(res, ms))


const doGetStacks = ()=>axios.get(`${gateway.baseUrl}/stacks`, {withCredentials: true});
const doCreateTaskWithStack = (payload)=>{axios.post(`${gateway.baseUrl}/stacks`, payload, {withCredentials: true});}
const doFetchTask = (payload)=>axios.get(`${gateway.baseUrl}/search_tasks`, {withCredentials: true})

export function* getStacks() {
  const data = yield call(doGetStacks);
  const stacks = {...data.data.content};
  const result = convertObjectToArray(stacks);
  yield put({ type: 'GOT_STACKS', payload: result});
}

export function tryAddStack(){
  return undefined
}

export function* fetchTasks(payload){
  payload.payload.time_needed = payload.payload.months*30*24*60*60*1000 + 
  payload.payload.days*24*60*60*1000 + payload.payload.hours*60*60*1000 + 
  payload.payload.minutes*60*1000 + payload.payload.seconds*1000;
  const {name, mood} = payload
  const result = yield call(doFetchTask, {name, time_needed: payload.payload.time_needed});
  yield put({type: "FETCHED_TASKS", payload: result.data});
}

export function* createTaskWithStack(payload){
  payload.payload.time_needed = payload.payload.months*30*24*60*60*1000 + 
  payload.payload.days*24*60*60*1000 + payload.payload.hours*60*60*1000 + 
  payload.payload.minutes*60*1000 + payload.payload.seconds*1000;
  const result = yield call(doCreateTaskWithStack, payload);
  yield put({type: "CREATED_TASK_WITH_STACK"})
}
  
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    yield takeLatest("GET_STACKS", getStacks),
    yield takeLatest("TRY_ADD_STACK", tryAddStack),
    yield takeLatest("CREATE_TASK_WITH_STACK", createTaskWithStack),
    //yield takeLatest("FETCH_TASKS", fetchTasks),
  ])
}

