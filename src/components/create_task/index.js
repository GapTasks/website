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

export default class CreateTask extends React.Component{
    constructor(){
        super();
        this.state = {
            name: "",
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 2,
            seconds: 30,
            t:5000,
            intervalHandle: undefined,
            isActive: true,
            mood: "none"
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
                newState.name = value
                break;
            }
            case "years":{
                newState.years = value
                break;
            }
            case "months":{
                newState.months = value
                break;
            }
            case "days":{
                newState.days = value
                break;
            }
            case "hours":{
                newState.hours = value
                break;
            }
            case "minutes":{
                newState.minutes = value
                break;
            }
            case "seconds":{
                newState.seconds = value
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
                {!this.state.isActive && <StyledButton variant="contained" color="primary" className={""}>
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
            </StyledCreateTask>

        );
    }

}