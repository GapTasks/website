import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import { acceptFriend } from '../friends/sagas';

const StyledUserFriends = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
`

const Friendship = styled.div`
    display: flex;
    align-items: center;
    font-family: san-serif;

    & .right-action{
        margin-left: auto;
    }
`
const CancelButton = styled(Button)`
    font-size: 24px !important;
    padding: 5px !important;
`

const UserFriends = ({friendships, username, acceptFriend, denyFriend, fetchStacks}) =>
    <StyledUserFriends>
        {friendships.map((friendship, key)=>{
            return<Friendship key={key}>
                    {(friendship.friend1==username) && <span>{friendship.friend2}</span>}
                    {(friendship.friend2==username) && <span>{friendship.friend1}</span>}
                    {(friendship.initiator==username && friendship.status=="initiated") && 
                        <Button className="right-action" variant="contained" color="secondary" disabled>
                            Requested
                        </Button>}
                    {(friendship.initiator!=username && friendship.status == "initiated") &&
                        <Button className="right-action" onClick={()=>acceptFriend({type:"ACCEPT_FRIEND", payload: friendship.id})} variant="contained" color="secondary">
                            Accept Request
                        </Button>}
                    <Button className="right-action" variant="contained" color="primary" onClick={()=>fetchStacks({
                        type:"FETCH_FRIENDS_STACKS",
                        payload: {friend: friendship.id}
                    })}>
                        See Stacks
                    </Button>
                    <CancelButton className="right-action" onClick={()=>denyFriend({type:"DENY_FRIEND", payload: friendship.id})} variant="contained" color="default">
                        🙅‍
                    </CancelButton>
                </Friendship>
        })}
    </StyledUserFriends>

export default UserFriends