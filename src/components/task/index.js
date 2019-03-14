import React from 'react'
import styled from 'styled-components'

const StyledTask = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    font-family: sans-serif;
    padding: 5px;
`

const Chat = styled.div`
    display: flex;
    margin-left: auto;
    cursor: pointer;
`
const Play = styled.div`
    display: flex;
    margin-left: auto;
    cursor: pointer;
`

export default class Task extends React.Component{
    render(){
        return(
            <StyledTask>
                {this.props.task.name ? this.props.task.name: "Untitled"}
                {!this.props.isFriend && <Play onClick={
                    ()=>this.props.play(this.props.task)
                }><i className="fas fa-play"></i></Play>}
                <Chat onClick={()=>this.props.enterChatRoom(this.props.task.id)}><i className="far fa-comments"></i></Chat>
            </StyledTask>
        )
    }

}