export default function stackReducer(state={list:[
        {tasks: ["task 11", "task 12", "task 13", "task 14"]},
        {tasks: ["task 21", "task 22", "task 23", "task 24"]},
        {tasks: ["task 31", "task 32", "task 33", "task 34"]},
        {tasks: ["task 41", "task 42", "task 43", "task 44"]}
    ]}
, action){
    let newState = {...state};
    switch(action.type){
        case 'default': {
            newState = newState; 
        }
    }
    return newState;
}