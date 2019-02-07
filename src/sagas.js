import stackSaga from './components/stack_home/sagas'
import fetchSaga from './components/fetch_task/sagas'
import { all, fork } from 'redux-saga/effects'

export default function* allSagas() {
    yield all([
      fork(stackSaga),
      fork(fetchSaga)
    ])
  }