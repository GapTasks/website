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
import {withRouter} from 'react-router-dom';
import AuthControl from 'components/auth/auth-control';


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
    bottom : 10px;
    right: 10px;
    color: #ff0;
    font-size: 28px;
    background: #222;
    cursor: pointer;
`

const Logout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed
    width: 60px;
    border-radius: 30px;
    height: 60px;
    top : 5px;
    right: 10px;
    color: #ff0;
    font-size: 28px;
    background: #222;
    cursor: pointer;
`;

const SearchButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed
    width: 60px;
    border-radius: 30px;
    height: 60px;
    bottom : 10px;
    left: 10px;
    color: #ff0;
    font-size: 28px;
    background: #222;
    cursor: pointer;
`

const Logo = styled.div`
    display: block;
    position: fixed;
    left: 30px;
    top: 30px;
    font-size: 42px;
    font-family: 'Satisfy', cursive;
`
const UserProfile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed
    width: 60px;
    border-radius: 30px;
    height: 60px;
    top : 5px;
    right: 80px;
    color: #ff0;
    font-size: 28px;
    background: #222;
    cursor: pointer;
`
const Friends = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed
    width: 60px;
    border-radius: 30px;
    height: 60px;
    top : 5px;
    right: 150px;
    color: #ff0;
    font-size: 28px;
    background: #222;
    cursor: pointer;

`

class StackHome extends React.Component {
    componentDidMount(){
        const {friend} = this.props.match.params;
        this.props.dispatch({type: "GET_STACKS", payload: {owner: friend}});
    }
    render(){
        const slidesToShow = Math.floor(window.innerWidth / 300);
        const stacks = this.props.stacks.list.length && this.props.stacks.list.map((element, key)=>{
            return <Stack key={key} tasks={element.tasks} addingTask={()=>{this.props.history.push(`create_stacktask/${element.id}`)}}/> 
        })
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
                    {stacks}
                </Slider>
                <AddStack onClick={()=>{this.props.history.push("/create_task?isStack=true")}}><i className="fas fa-plus"></i></AddStack>
                <UserProfile onClick={()=>this.props.history.push(`user_profile`)} ><i className="fas fa-user"></i></UserProfile>
                <Friends onClick={()=>this.props.history.push(`friends`)} ><i className="fas fa-users"></i></Friends>
                <Logout onClick={()=>{
                    AuthControl.logout(()=>{});
                    this.props.history.push("home");
                }}><i className="fas fa-sign-out-alt"></i></Logout>
                <Logo>Gaptasks</Logo>
                <SearchButton onClick={()=>this.props.history.push("fetch_task")}><i className="fas fa-search"></i></SearchButton>
                {/*<BottomBar />*/}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StackHome))