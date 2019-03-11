import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Countdown from 'react-countdown-now';
import {moods} from 'globals.js';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';

const StyledCreateTask  = styled.div`
    display: flex;
    flex-direction: column;
`

const TimeBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`

const StyledButton = styled(Button)`
    margin-top: 10px !important;
`

const StyledMenuItem = styled(MenuItem)`
    font-size: 24px !important;
`

const HomeButton = styled(Button)`
    margin-top: 5px !important;
    font-size: 24px !important;
`

class CreateTask extends React.Component{
    constructor(){
        super();
        this.state = {
            name: "",
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            t:5000,
            intervalHandle: undefined,
            isActive: false,
            mood: "none",
            isStack: false,
            id: undefined
        }
    }

    componentDidMount(){
        let queries = queryString.parse(this.props.location.search);
        if(queries.isStack){
            this.setState({isStack: true})
        }
        if(queries.stackId){
            this.setState({id: queries.stackId})
        }
        if(queries.isActive){
            this.setState({isActive: true})
        }
    }

    tick(){
        let duration = this.state.hours*60*60*1000 + this.state.minutes*60*1000 + this.state.seconds*1000;
        if(duration===0){
            clearInterval(this.state.intervalHandle)
            return;
        }
        duration -= 1000;
        const hours = Math.floor(duration / (1000*60*60));
        duration -= hours*(1000*60*60);
        const minutes = Math.floor(duration / (1000*60));
        duration -= minutes*(1000*60);
        const seconds = Math.floor(duration / 1000);
        this.setState({hours, minutes, seconds});
    }

    onChange(key, value){
        let newState = {...this.state}
        switch(key){
            case "name":{
                newState.name = value;
                break;
            }
            case "years":{
                const intValue = parseInt(value);
                newState.years = isNaN(intValue) ? "" : intValue;
                break;
            }
            case "months":{
                const intValue = parseInt(value);
                newState.months = isNaN(intValue) ? "" : intValue;
                break;
            }
            case "days":{
                const intValue = parseInt(value);
                newState.days = isNaN(intValue) ? "" : intValue;
                break;
            }
            case "hours":{
                const intValue = parseInt(value);
                newState.hours = isNaN(intValue) ? "" : intValue;
                break;
            }
            case "minutes":{
                const intValue = parseInt(value);
                newState.minutes = isNaN(intValue) ? "" : intValue;
                break;
            }
            case "seconds":{
                const intValue = parseInt(value);
                newState.seconds = isNaN(intValue) ? "" : intValue;
                break;
            }
        }
        this.setState({...newState});
    }
    render(){
        return(
            <StyledCreateTask>
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={""}
                    value={this.state.name}
                    onChange={(e)=>this.onChange("name", e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <TimeBlock>
                    {/*<TextField
                        id="outlined-name"
                        label="Years"
                        className={""}
                        value={this.state.years}
                        onChange={(e)=>this.onChange("years", e.target.value)}
                        margin="normal"
                        variant="outlined"
                        type="number"
                    />

                    <TextField
                        id="outlined-name"
                        label="Months"
                        className={""}
                        value={this.state.months}
                        onChange={(e)=>this.onChange("months", e.target.value)}
                        margin="normal"
                        variant="outlined"
                        type="number"
                    />

                    <TextField
                        id="outlined-name"
                        label="Days"
                        className={""}
                        value={this.state.days}
                        onChange={(e)=>this.onChange("days", e.target.value)}
                        margin="normal"
                        variant="outlined"
                        type="number"
                    />*/}

                    <TextField
                        id="outlined-name"
                        label="Hours"
                        className={""}
                        value={this.state.hours}
                        onChange={(e)=>this.onChange("hours", e.target.value)}
                        margin="normal"
                        variant="outlined"
                        type="number"
                        disabled={this.props.active ? true: false}
                    />


                    <TextField
                        id="outlined-name"
                        label="Minutes"
                        className={""}
                        value={this.state.minutes}
                        onChange={(e)=>this.onChange("minutes", e.target.value)}
                        margin="normal"
                        variant="outlined"
                        type="number"
                        disabled={this.props.active ? true: false}
                    />

                    <TextField
                        id="outlined-name"
                        label="Seconds"
                        className={""}
                        value={this.state.seconds}
                        onChange={(e)=>this.onChange("seconds", e.target.value)}
                        margin="normal"
                        variant="outlined"
                        type="number"
                        disabled={this.props.active ? true: false}
                    /> 
                </TimeBlock>
                <Select
                    value={this.state.mood}
                    onChange={(e)=>{
                        this.setState({mood: e.target.value})
                    }}
                    input={
                        <OutlinedInput labelWidth={0} name="age" id="outlined-age-simple" />
                    }
                    >
                    <StyledMenuItem key={-1} value={"none"}>{`Moood...`}</StyledMenuItem>
                    {moods.map((mood, key)=>{
                        return <StyledMenuItem key={key} value={mood.emoji}>{`${mood.emoji} ${mood.mood}`}</StyledMenuItem>
                    })}
                </Select>
                {(this.state.isStack) && <StyledButton onClick={()=>{
                    this.props.dispatch({type:"CREATE_TASK_WITH_STACK", payload:this.state})
                }} variant="contained" color="primary" className={""}>
                    Create
                </StyledButton>}
                {(this.state.stackId) && <StyledButton onClick={()=>{
                    this.props.dispatch({type:"CREATE_TASK_WITH_STACK", payload:this.state})
                }} variant="contained" color="primary" className={""}>
                    Edit
                </StyledButton>}
                {this.props.match.params.stackId && <StyledButton onClick={()=>{
                    this.props.dispatch({type:"ADD_TASK_TO_STACK", payload:{...this.state, stack: this.props.match.params.stackId}})
                }} variant="contained" color="primary" className={""}>
                    Create
                </StyledButton>}
                {this.state.isActive && 
                    <React.Fragment>
                        <StyledButton onClick={()=>{
                            let intervalHandle = setInterval(()=>this.tick(), 1000);
                            this.setState({intervalId: intervalHandle});
                        }} variant="contained" color="primary" className={""}>
                            Start
                        </StyledButton>
                        <StyledButton onClick={()=>{
                            clearInterval(this.state.intervalId);
                        }} variant="contained" color="primary" className={""}>
                            Stop
                        </StyledButton>
                    </React.Fragment>
                }
                <HomeButton variant="contained" color="primary" onClick={()=>{this.props.history.push("/home")}}>
                    <i className="fas fa-home"></i>
                </HomeButton>
            </StyledCreateTask>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTask))