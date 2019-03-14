import { call, put, takeEvery, fork, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import {convertObjectToArray} from 'globalFns'
import {ex as gateway} from 'components/api-gateway'

const doGetChatForRoom = (payload)=>axios.get(`${gateway.baseUrl}/chat`, {params:{room: payload.payload}, withCredentials: true})
const doSendChatForRoom = (payload)=>axios.post(`${gateway.baseUrl}/chat`, payload.payload, {withCredentials: true})


export function* sendChatForRoom(payload){

  const status = yield call(doSendChatForRoom, payload)
  const result = yield call(doGetChatForRoom, {room: payload.room})
  yield put({type: "GOT_NEW_CHATS", payload: result.data.content});
}

export function* getChatForRoom(payload){
  const result = yield call(doGetChatForRoom, payload);
  yield put({type: "GOT_NEW_CHATS", payload: result.data.content});
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
      yield takeLatest("SEND_CHAT_FOR_ROOM", sendChatForRoom),
      yield takeLatest("GET_CHAT_FOR_ROOM", getChatForRoom),
    ])
  }