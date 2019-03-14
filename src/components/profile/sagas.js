import { call, put, takeEvery, fork, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import {ex as gateway} from 'components/api-gateway'
import {convertObjectToArray} from 'globalFns'

const delay = (ms) => new Promise(res => setTimeout(res, ms))
const doFetchProfile = (payload) => axios.get(`${gateway.baseUrl}/profile`, {params: {query: payload}, withCredentials: true});



export function* fetchProfile(payload){
  const result = yield call(doFetchProfile);
  yield put({type: "GOT_PROFILE", payload: result.data.content.profile[0]});
}
    
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    yield takeLatest("GET_PROFILE", fetchProfile),
  ])
}