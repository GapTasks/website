export default function searchReducer(state={list:[]}, action){
    let newState = {...state};
    switch(action.type){
        case 'default': {
            newState = newState; 
            break;
        }
    }
    return newState;
}