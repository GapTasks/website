import { createStore, combineReducers } from 'redux'

import stacks from './components/stack_home/reducer';
import card from './components/card/reducer';
import task from './components/task/reducer';


const reducer = combineReducers({
    stacks, card, task
});


const store = createStore(reducer);

export default store;