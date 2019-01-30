import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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
            seconds: 0
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
                <InputLabel  htmlFor="outlined-mood-simple">
                    Mood
                </InputLabel>
                <Select
                    value={""}
                    onChange={()=>{}}
                    label="Mood"
                    input={
                        <OutlinedInput labelWidth={50} label="Mood" name="mood" id="outlined-mood-simple" />
                    }
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>👊</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <StyledButton variant="contained" color="primary" className={""}>
                    Fetch
                </StyledButton>
            </StyledCreateTask>

        );
    }

}