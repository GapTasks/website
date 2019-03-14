export default function chatReducer(state={messages:[]}, action){
    let newState = {...state};
    switch(action.type){
        case 'default': {
            newState = newState; 
            break;
        }
        case 'GOT_NEW_CHATS': {
            newState.messages = action.payload.map((message, key)=>{
                message.text = message.parts.map((part, k)=>part.content).join(' ')
                message.from = message.user_id;
                return message;
            });
            break;
        }
    }
    return newState;
}