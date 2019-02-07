export default function stackReducer(state={list:[]}, action){
let newState = {...state};
switch(action.type){
    case 'default': {
        newState = newState; 
        break;
    }
    case 'GOT_STACKS': {
        newState.list = action.payload
        break;
    }
    case 'CREATED_TASK_WITH_STACK': {
        break;
    }

}
return newState;
}