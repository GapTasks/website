import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
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

export default class FetchTask extends React.Component{
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
            mood: "none"
        }
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
                <StyledButton variant="contained" color="primary" className={""}>
                    Fetch
                </StyledButton>
            </StyledCreateTask>

        );
    }

}