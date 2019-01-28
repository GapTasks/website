import React from 'react'
import styled from 'styled-components'
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

    .fa-plus {
        margin-left: auto;
        font-size: 26px;
        color: #222;
    }
`

export default class Stack extends React.Component {
    render(){
        return (
            <StyledStack>
                <StackTop>
                    <i className="fas fa-plus"></i>
                </StackTop>
                {this.props.tasks.map((element, key)=>{
                    return <Task key={key} task={element} />
                })}
            </StyledStack>
        );
    }
}