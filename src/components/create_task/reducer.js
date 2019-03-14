export default function createReducer(state={
    task:{
        chatRoomId: "",
        deadline: 0,
        id: undefined,
        mood: "",
        name: "",
        stack: "",
        time_needed: 0
    }
}, action){
    let newState = {...state}
    switch(action.type){
        case "default":
            newState = newState
        case "GOT_TASK_WITH_ID":
            newState.task = action.payload;
            break;
    }
    return newState;
}