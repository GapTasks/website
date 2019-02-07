export default function taskReducer(state={

}, action){
    let newState = {...state};
    switch(action.type){
        case 'default': {
            newState = newState; 
        }
    }

    return newState;
}