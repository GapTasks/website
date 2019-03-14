import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

const StyledProfile = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 200px;
    left: 50%;
    top: 50%;
    padding: 10px;
    align-items: center;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px 0px #222;
    font-family: sans-serif;
    background: #FF0;
    & label{
        margin: 5px;
    }
`

const Home = styled.div`
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

class ProfileView extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){
        this.props.dispatch({
            type: "GET_PROFILE",
            payload: null
        })
    }

    render(){
        return(
            <React.Fragment>
                <Home onClick={()=>this.props.history.push("home")}>
                    <i className="fas fa-home"></i>
                </Home>
                <StyledProfile>
                    <label>Username</label>
                    <div>{this.props.profile.id}</div>
                    <br/>
                    <label>Name</label>
                    <div>{this.props.profile.name}</div>
                    <br/>
                    <label>Email</label>
                    <div>{this.props.profile.email}</div>
                </StyledProfile>
            </React.Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileView))