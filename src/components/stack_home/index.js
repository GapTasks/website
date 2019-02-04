import 'regenerator-runtime/runtime'
import React from 'react'
import { connect } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Stack from '../stack';
import BottomBar from '../bottom_bar';
import styled from 'styled-components';
import {colors} from 'globals.js';


const StyledStackHome = styled.div`
    display: block;
    position: relative;
    height: 90%;
    top: 10%;
`

const AddStack = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed
    width: 60px;
    border-radius: 30px;
    height: 60px;
    bottom : 60px;
    right: 10px;
    color: #ff0;
    font-size: 28px;
    background: #222;
    cursor: pointer;
`

class StackHome extends React.Component {
    componentDidMount(){
        
        this.props.dispatch({type: "GET_STACKS", payload: null});
    }
    render(){
        const slidesToShow = Math.floor(window.innerWidth / 300);
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }
        return(
            <StyledStackHome className="container">
                <Slider settings={settings}>
                    {this.props.stacks.length && this.props.stacks.list.map((element, key)=>{
                        return <Stack key={key} tasks={element.tasks} /> 
                    })}
                </Slider>
                <AddStack onClick={()=>this.props.history.push("create_task")}><i className="fas fa-plus"></i></AddStack>
                <BottomBar />
            </StyledStackHome>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(StackHome)