import React from 'react'
import styled, {css} from 'styled-components';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const StyledChat = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
`

const ChatText = styled(TextField)`
    display: flex;
    flex-grow: 1;
    margin: 0 5px;
`

const ChatControls = styled.div`
    display: flex;
    margin-top: auto;
`
const ChatButtons = styled(Button)`
    height: 56px;
    align-self: center;
    top: 4px;
`

const ChatArea = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    background: #dadada;
    border-radius: 10px;
    padding: 10px;
`
const ChatTitle = styled.div`
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-family: sans-serif;
`

const ChatMessage = styled.div`
    font-family: sans-serif;
    color: #222;
    & .text{
        display: flex;
        margin: 10px;
        background: #3498db;
        padding: 5px;
        border-radius: 5px;
        ${props => props.isMe && css`
            background: #2ecc71;
        `}
    }
    margin-right: auto;
    ${props => props.isMe && css`
        margin-right: 0;
        margin-left: auto;
    `}

     .sender {
         font-size: 11px;
         position: relative;
         top: -5px;
         ${props => props.isMe && css`
            text-align: right;
        `}
     }
`

const messages = [
    {text:"This is a test", from:"test1", isMe: false},
    {text:"This is a test", from:"test2", isMe: false},
    {text:"This is a test", from:"Me", isMe: true},
    {text:"This is a test", from:"test1", isMe: false}
]

class ChatView extends React.Component {
    constructor(){
        super()
        this.state = {
            chatMessage:"",
            intervalHandle: undefined
        }
    }

    componentDidMount(){
        const roomId = this.props.match.params.room;
        this.props.dispatch({
            type: "GET_CHAT_FOR_ROOM",
            payload: roomId
        })
        let intervalHandle = setInterval(()=>{
            console.log("Getting chat for "+ roomId);
            this.props.dispatch({
                type: "GET_CHAT_FOR_ROOM",
                payload: roomId
            })
        }, 5000)
        this.setState({intervalHandle: intervalHandle});
    }

    componentWillUnmount(){
        console.log("Unmounting component")
        clearInterval(this.state.intervalHandle);
    }

    render(){
        return (
            <StyledChat>
                <ChatTitle>
                    {this.props.title||"Chat"}
                </ChatTitle>
                <ChatArea>
                    {
                        this.props.chat.messages.map((message, k)=>
                            <ChatMessage key={k} isMe={message.isMe}>
                                <div className="text">{message.text}</div>
                                <div className="sender">{message.from}</div>
                            </ChatMessage>)
                    }
                </ChatArea>
                <ChatControls>
                    <ChatText
                        id="outlined-chat"
                        label=""
                        className={""}
                        value={this.state.chatMessage}
                        onChange={(e)=>this.setState({chatMessage: e.target.value})}
                        margin="normal"
                        variant="outlined"
                    />
                    <ChatButtons onClick={()=>{
                            if(this.state.chatMessage.length){
                                this.props.dispatch({
                                    type: "SEND_CHAT_FOR_ROOM",
                                    payload: {text: this.state.chatMessage, room: this.props.match.params.room}
                                })
                                this.setState({chatMessage:""})
                            }
                        }} 
                        variant="contained" color="primary" className={""}>
                            Send
                    </ChatButtons>
                </ChatControls>
            </StyledChat>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
}


const mapDispatchToProps = dispatch => {
    return {
      dispatch: dispatch
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatView))