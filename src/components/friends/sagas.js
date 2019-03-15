import { call, put, takeEvery, fork, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import {ex as gateway} from 'components/api-gateway'
import {convertObjectToArray} from 'globalFns'

const delay = (ms) => new Promise(res => setTimeout(res, ms))
const doFetchSuggestions = (payload) => axios.get(`${gateway.baseUrl}/user_suggestions`, {params: {query: payload}, withCredentials: true});
const doAddFriend = (payload) => axios.post(`${gateway.baseUrl}/add_friend`, payload, {withCredentials:true}); 
const doGetFriendships = (payload) => axios.get(`${gateway.baseUrl}/friendships`, {params: {query: payload}, withCredentials:true});
const doAcceptFriend = (payload) => axios.post(`${gateway.baseUrl}/accept_friend`, {friendship: payload}, {withCredentials:true});
const doDenyFriend = (payload) => axios.post(`${gateway.baseUrl}/deny_friend`, {friendship: payload}, {withCredentials:true});


export function* fetchSuggestions(payload){
  const result = yield call(doFetchSuggestions, payload.payload);
  const suggestions = {...result.data.content};
  yield put({type: "GOT_SEARCH_QUERY_SUGGESTIONS", payload: {suggestions: convertObjectToArray(suggestions)}});
}

export function* showUser(payload){

}

export function* addFriend(payload){
  const result = yield call(doAddFriend, payload.payload);
  const status = {...result.data.content};
  yield put({type:"REQUESTED_FRIEND", payload: null})
  yield put({type:"GET_FRIENDSHIPS"});
}

export function* denyFriend(payload){
  const result = yield call(doDenyFriend, payload.payload);
  const friendships = result.data.content.friendships;
  const username = result.data.content.username;
  yield put({type:"FRIEND_DENIED", payload:{friendships, username}})
}

export function* acceptFriend(payload){
  const result = yield call(doAcceptFriend, payload.payload);
  const status = {...result.data.status};
  yield put({type:"ACCEPTED_FRIENDSHIP"})
  yield put({type:"GET_FRIENDSHIPS"});
}

export function* getFriendships(payload){
  const result = yield call(doGetFriendships, null);
  const friendships = result.data.content.friendships;
  const username = result.data.content.username;
  yield put({type:"GOT_FRIENDSHIPS", payload:{friendships, username}});
}

export function* fetchFriendStacks(payload){
  payload.payload.push(`friend_stack/${payload.payload.friend}`);
}
    
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    yield takeLatest("SEARCH_QUERY_UPDATED", fetchSuggestions),
    yield takeLatest("SHOW_USER", showUser),
    yield takeLatest("ADD_FRIEND", addFriend),
    yield takeLatest("ACCEPT_FRIEND", acceptFriend),
    yield takeLatest('GET_FRIENDSHIPS', getFriendships),
    yield takeLatest('DENY_FRIEND', denyFriend),
    yield takeLatest('FETCH_FRIENDS_STACKS', fetchFriendStacks),
  ])
}