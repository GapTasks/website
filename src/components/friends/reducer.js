export default function friendsReducer(state={suggestions:[], friendships:[]}, action){
    let newState = {...state};
    switch(action.type){
        case 'default': {
            newState = newState; 
            break;
        }
        case 'GOT_SEARCH_QUERY_SUGGESTIONS': {
            newState.suggestions = action.payload.suggestions;
            break;
        }
        case 'GOT_FRIENDSHIPS': {
            newState.friendships = action.payload.friendships;
            newState.username = action.payload.username;
            newState.suggestions = [];
            break;
        }
        case 'FRIEND_DENIED': {
            newState.friendships = action.payload.friendships;
            newState.username = action.payload.username;
            break;
        }
    }
    return newState;
}