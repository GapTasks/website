import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';

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

const UserFriends = ({friendships, username}) =>
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
                        <Button className="right-action" variant="contained" color="secondary">
                            Accept Request
                        </Button>}
                </Friendship>
        })}
    </StyledUserFriends>

export default UserFriends