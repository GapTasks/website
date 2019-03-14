import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import stacks from './components/stack_home/reducer';
import card from './components/card/reducer';
import create from './components/create_task/reducer';
import fetch from './components/fetch_task/reducer';
import friends from  './components/friends/reducer';
import profile from './components/profile/reducer';
import chat from './components/chatView/reducer';
import createTask from './components/create_task/reducer';
import allSagas from './sagas';


const reducer = combineReducers({
    stacks, card, create, fetch, friends, profile, chat, createTask
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()


const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

// then run the saga
sagaMiddleware.run(allSagas)

export default store;