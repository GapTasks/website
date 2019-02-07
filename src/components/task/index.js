import React from 'react'
import styled from 'styled-components'

const StyledTask = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    font-family: sans-serif;
`

export default class Task extends React.Component{
    render(){
        return(
            <StyledTask>
                {this.props.task.name ? this.props.task.name: "Untitled"}
            </StyledTask>
        )
    }

}