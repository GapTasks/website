import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import Search from '@plan-three/material-ui-autosuggest'
import {withRouter} from 'react-router-dom';
import UserFriends from 'components/user_friends'
import UserSearchResults from  'components/user_search_results'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const FriendsPage = styled.div`
    display: flex;
    flex-direction: column;
`

class Friends extends React.Component {
    constructor(){
        super();
        this.state = {
            searchQuery: ""
        }
    }
    componentDidMount() {
        this.props.dispatch({type:"GET_FRIENDSHIPS"})
    }

    render(){
        const suggestions = this.props.friends.suggestions.map((e, k)=>{return  e.id});
        const friendships = this.props.friends.friendships
        return(
            <FriendsPage>
                <TextField
                    id="standard-full-width"
                    label="Search"
                    style={{ margin: 8 }}
                    placeholder="username"
                    helperText="Search for a friend! (case-sensitive username)"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.searchQuery}
                    onChange={(e)=>this.setState({searchQuery:e.target.value})}
                />
                <Button onClick={()=>this.props.dispatch({
                    type: "SEARCH_QUERY_UPDATED",
                    payload: this.state.searchQuery
                })} variant="contained" color="primary">
                    Search
                </Button>
                <UserSearchResults users={suggestions} initiateFriend={(action)=>this.props.dispatch(action)}/>
                <UserFriends friendships={friendships} username={this.props.friends.username} 
                acceptFriend={(action)=>{this.props.dispatch(action); this.props.dispatch({type:"GET_FRIENDSHIPS"})}} 
                denyFriend={(action)=>this.props.dispatch(action)}
                fetchStacks={(action)=>{action.payload.push = this.props.history.push.bind(this); this.props.dispatch(action)}}
                />
            </FriendsPage>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Friends))