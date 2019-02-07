export default function createReducer(state={}, action){
    let newState = {...state}
    switch(action){
        case "default":
            return newState;
    }
    return newState;
}