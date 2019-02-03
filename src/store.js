import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import stacks from './components/stack_home/reducer';
import card from './components/card/reducer';
import task from './components/task/reducer';

import allSagas from './sagas';


const reducer = combineReducers({
    stacks, card, task
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