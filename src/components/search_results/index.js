import React from 'react'
import styled from 'styled-components'
import Task from '../task'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const StyledSearch = styled.div`
    display: flex;
    flex-direction: column;
`

class SearchResults extends React.Component{
    constructor(){
        super();
        this.state = {
            tasks: []
        }
    }
    componentDidMount(){
        debugger
        this.setState({tasks: this.props.location.state.tasks})
    }
    render(){
        return(
            <StyledSearch>
                {this.state.tasks.map((element, key)=>{
                        return <Task key={key} task={element} />
                })}
            </StyledSearch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults))