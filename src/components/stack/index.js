import React from 'react'
import styled, {css} from 'styled-components'
import Task from '../task'


const StyledStack = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    align-self: center;
    margin-left: auto;
    margin-right: auto;
    margin: 5px auto;
    box-shadow: 0 0 20px 5px #ececec;
    padding: 5px;
    background: rgb(255, 255, 0);
    position: relative;
    max-height: 70vh;
    ${props => props.isFriend && css`
        background: #2ecc71;
    `}
`

const StackTop = styled.div`
    position: relative;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-height: 100%;
    overflow-y: auto;
    .fa-plus {
        margin-left: auto;
        font-size: 26px;
        color: #222;
        cursor: pointer;
    }

    .fa-plus:hover{
        color: #0F0;
        transition: all 1s ease;
        transition-property: color;
    }

    span {
        display: flex;
        font-family: sans-serif;
        align-self: center;
        font-weight: bold
        margin-left: auto;
    }
`

const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
`

export default class Stack extends React.Component {
    render(){
        return (
            <StyledStack isFriend={this.props.isFriend}>
                <StackTop>
                    {(this.props.tasks && this.props.tasks.length) && 
                        <span>{this.props.tasks[0].name}</span>
                    }
                    <i className="fas fa-plus" onClick={()=>{this.props.addingTask()}}></i>
                </StackTop>
                <TaskList>
                    {(this.props.tasks && this.props.tasks.length) && this.props.tasks.map((element, key)=>{
                        return <Task key={key} isFriend={this.props.isFriend} task={element} play={(task)=>this.props.play(task)} enterChatRoom={(room)=>this.props.enterChatRoom(room)}/>
                    })}
                    {(this.props.tasks && ! this.props.tasks.length) && <Task key={0} task={this.props.tasks} />}
                </TaskList>
            </StyledStack>
        );
    }
}