import React from 'react'
import styled from 'styled-components'

const buttonSize = 60;

const StyledBottomBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    box-shadow: 0 5px 5px 5px #ececec;
    width: 100%;
    background: #fff;
`

const GButton = styled.button `
    position: absolute;
    top: -50%
    left: calc(50% - ${buttonSize/2}px);
    height: ${buttonSize}px;
    width: ${buttonSize}px;
    border-radius: ${buttonSize/2}px;
    box-shadow: 0 5px 5px 5px #dadada;
    background: #fff;
    color: #222;
    font-size: 30px;
    cursor: pointer;
`

export default class BottomBar extends React.Component{
    render(){
        return(
            <StyledBottomBar>
                <GButton>G</GButton>
            </StyledBottomBar>
        )
    }
}