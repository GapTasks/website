import React from 'react'
import { connect } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Stack from '../stack';
import BottomBar from '../bottom_bar';
import styled from 'styled-components';


const StyledStackHome = styled.div`
    display: block;
    position: relative;

`

class StackHome extends React.Component {
    render(){
        const slidesToShow = Math.floor(window.innerWidth / 300);
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5
        }
        return(
            <StyledStackHome className="container">
                <Slider settings={settings}>
                    {this.props.stacks.list.map((element, key)=>{
                        return <Stack key={key} tasks={element.tasks} /> 
                    })}
                </Slider>
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