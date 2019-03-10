import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';

const StyledUserSearchResults = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
`

const User = styled.div`
    display: flex;
    margin: 5px;
    justify-content: space-between;

    & span {
        align-items: center;
    }
`

const UserSearchResults = ({users, initiateFriend}) =>{
    users = users.splice(0, 3);
    return <StyledUserSearchResults>
        {users.map((user, key)=> 
            <User key={key}>
                <span>
                    {user}
                </span>
                <Button onClick={()=>initiateFriend({
                    type: "ADD_FRIEND",
                    payload: {friend: user}
                })} variant="contained" color="primary">
                    ADD FRIEND
                </Button>
            </User>)}
    </StyledUserSearchResults>}

export default UserSearchResults