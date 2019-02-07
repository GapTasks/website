export default function fetchReducer(state={list:[]}, action){
    let newState = {...state};
    switch(action.type){
        case 'default': {
            newState = newState; 
            break;
        }  
        case 'FETCHED_TASKS':{
            const p = action.payload;
        }
    }
    return newState;
}