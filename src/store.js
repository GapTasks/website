import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import stacks from './components/stack_home/reducer';
import card from './components/card/reducer';
import task from './components/task/reducer';
import create from './components/create_task/reducer';
import fetch from './components/fetch_task/reducer';
import friends from  './components/friends/reducer';
import allSagas from './sagas';


const reducer = combineReducers({
    stacks, card, task, create, fetch, friends
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