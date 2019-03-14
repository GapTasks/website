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
import Button from '@material-ui/core/Button';


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

const HelpText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    position: fixed
    height: 60px;
    bottom : 0;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 18px;
    cursor: pointer;
    color: #787878;
`

const StyledProfile = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 300px;
    left: 50%;
    top: 50%;
    padding: 10px;
    align-items: center;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px 0px #222;
    font-family: sans-serif;
    background: #FFF;
    & span{
        margin: 10px;
    }
`

const HomeButton = styled.div`
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

class StackHome extends React.Component {
    constructor(){
        super()
        this.state ={
            isFriend: false
        }
    }
    componentDidMount(){
        const {friend} = this.props.match.params;
        if(friend){
            this.setState({isFriend: true});
        }
        this.props.dispatch({type: "GET_STACKS", payload: {owner: friend}});
    }
    render(){
        const slidesToShow = Math.floor(window.innerWidth / 300);
        const stacks = this.props.stacks.list.length && this.props.stacks.list.map((element, key)=>{
            return <Stack isFriend={this.state.isFriend} key={key} tasks={element.tasks} addingTask={()=>{this.props.history.push(`create_stacktask/${element.id}`)}}
                enterChatRoom={
                    (room)=>{
                        this.props.history.push(`/chat/${room}`);
                    }
                }
                //payload.payload.history.push({pathname: "search_results", state:{tasks: convertObjectToArray(tasks)}});
  
                play={(task)=>{this.props.history.push(`/create_task/?isActive=true&id=${task.id}`)}}
            /> 
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
                {this.props.stacks.list.length > 0 && <Slider settings={settings}>
                    {stacks}
                </Slider>}
                {this.props.stacks.list.length == 0 &&
                    <StyledProfile>
                        <span>Click on <i className="fas fa-plus"></i> to create stacks of tasks</span>
                        <span>Click on <i className="fas fa-search"></i> to search for tasks</span>
                        <span>Click on <i className="fas fa-user"></i> to view profile</span>
                        <span>Click on <i className="fas fa-users"></i> to manage friends</span>
                    </StyledProfile>
                }
                <Logo>Gaptasks</Logo>
                {!this.state.isFriend && 
                    <React.Fragment>
                        <AddStack onClick={()=>{this.props.history.push("/create_task?isStack=true")}}><i className="fas fa-plus"></i></AddStack>
                        <UserProfile onClick={()=>this.props.history.push(`profile`)} ><i className="fas fa-user"></i></UserProfile>
                        <Friends onClick={()=>this.props.history.push(`friends`)} ><i className="fas fa-users"></i></Friends>
                        <Logout onClick={()=>{
                            AuthControl.logout(()=>{});
                            this.props.history.push("home");
                        }}><i className="fas fa-sign-out-alt"></i></Logout>
                        <SearchButton onClick={()=>this.props.history.push("fetch_task")}><i className="fas fa-search"></i></SearchButton>
                    </React.Fragment>
                }
                {this.state.isFriend && 
                    <HomeButton variant="contained" color="primary" onClick={()=>{this.props.history.push("/home")}}>
                        <i className="fas fa-home"></i>
                    </HomeButton>
                }
                {/*<BottomBar />*/}
                <HelpText>Swipe left/right to view stacks</HelpText>
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