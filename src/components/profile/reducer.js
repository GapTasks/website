export default function profileReducer(state={id:"", name: "", email: ""}, action){
    let newState = {...state};
    switch(action.type){
        case 'default': {
            newState = newState; 
            break;
        }
        case 'GOT_PROFILE': {
            newState.id = action.payload.id;
            newState.name = action.payload.name;
            newState.email = action.payload.email;
            break;
        }
    }
    return newState;
}