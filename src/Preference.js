import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
var moment = require('moment');



const theme = createMuiTheme({
  overrides: {
    MuiSelect:{
      root:{
        margin: '-20px -25px -5px -5px'
      }
    }
  }
})


export default class Preference extends Component{
    constructor(props){
        super(props);
        this.state={
            start_time:'',
            end_time: '',
            modify: true
        }
    }

    generateItems = (is_end_time, start_time) => {
        var t = moment().set({
            'hour': is_end_time ? parseInt(start_time.substr(0,2)) + (start_time.substr(6,7) == 'pm' ? 12 : 0) : 0,
            'minute':is_end_time ? parseInt(start_time.substr(3, 5)) : 0})
        let l = [];
        let i = 0;
        while(i<48){
            l.push(<MenuItem value={t.format('hh:mm a')}>{t.format('hh:mm a')}</MenuItem>)
            t.add(30, 'm')
            i += 1;
            if((t.hour() == 23 && t.minute() == 30) || i > 48) break;
        }
        return l;
    }

    render(){
        let {start_time, end_time} = this.state;
        return(
            <div onMouseEnter={()=>{this.setState({modify:false})}}
                 onMouseLeave={()=>{this.setState({modify:true})}}>
                    <ThemeProvider theme={theme}>
                    <FormControl variant="filled" >
                        <Select defaultValue={'12:00 am'} variant="filled" IconComponent = {()=><div/>}
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={start_time}
                          onChange={e=>{this.setState({start_time: e.target.value})}}
                          MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            }
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {this.generateItems()}
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" >
                        <Select defaultValue={'12:00 am'} variant="filled" IconComponent = {()=><div/>}
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={end_time}
                          onChange={e=>{this.setState({end_time: e.target.value})}}
                          MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            }
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {this.generateItems(true, this.state.start_time)}
                        </Select>
                      </FormControl>
                      </ThemeProvider>
            </div>
        )
    }
}
