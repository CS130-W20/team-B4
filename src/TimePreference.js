import React,{Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import clock from './img/clock.png';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
var moment = require('moment');


const TimeSelect = withStyles({
  root: {
      fontFamily:'Raleway',
      fontSize:15,
      width:72,
    border: 0,
  },
  filled:{
      '&$filled': {
          padding:5
        },
  }
})(Select);

/**
 *   Represents user's preferred time.
 *   Default: 5pm - 6pm, can be modified
 *
 *   @param start_time user's preferred start time
 *   @param end_time user's preferred end time
 *   @param handleStartTime handles changes to start time
 *   @param handleEndTime handles changes to end time
 *   @param modifyStart whether write permissions are granted
 *   @param modifyEnd whether write permissions are granted
 */
export default class TimePreference extends Component{
    constructor(props){
        super(props);
        this.state={
            modifyStart: false,
            modifyEnd: false
        }
    }

    generateItems = (is_end_time, start_time) => {
        var t = moment().set({
            'hour': is_end_time ? parseInt(start_time.substr(0,2)) + (start_time.substr(6,7) === 'pm' ? 12 : 0) : 0,
            'minute':is_end_time ? parseInt(start_time.substr(3, 5)) : 0})
        let l = [];
        let i = 0;
        while(i<48){
            l.push(<MenuItem key={i} value={t.format('hh:mm a')}>{t.format('hh:mm a')}</MenuItem>)
            t.add(30, 'm')
            i += 1;
            if((t.hour() === 23 && t.minute() === 30) || i > 48){
                l.push(<MenuItem key={i} value={t.format('hh:mm a')}>{t.format('hh:mm a')}</MenuItem>)
                break;
            }

        }
        return l;
    }

    render(){
        let {start_time, end_time, handleStartTime, handleEndTime} = this.props;
        const borderStyle = this.props.fill ? '1px solid #CCC' : '';
        return(
            <div className="flex pb2 mb2" style={{borderBottom:`${borderStyle}`}} >
                <img alt={"alt"} className="mr2 pt1"  src={clock} style={{width:24, height:24}} />
                <div onMouseEnter={()=>{this.setState({modifyStart:false})}}
         onMouseLeave={()=>{this.setState({modifyStart:false})}}>
                    {this.props.modify ? <div style={{fontSize:15, padding:'6px 8.5px 0px 8.5px'}}>{start_time}</div>:
                    this.props.fill ? <TimeSelect variant="filled" IconComponent = {()=><div/>}
                      value={start_time}
                      onChange={handleStartTime}
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
                    </TimeSelect>
                    : <TimeSelect IconComponent = {()=><div/>}
                      value={start_time}
                      onChange={handleStartTime}
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
                    </TimeSelect>
                }
                </div>
                <div className="flex items-center mh1"><div style={{borderTop:'1px solid black', height:0, width:10}}/></div>
                <div onMouseEnter={()=>{this.setState({modifyEnd:false})}}
         onMouseLeave={()=>{this.setState({modifyEnd:false})}}>
                    {this.props.modify ? <div style={{fontSize:15, padding:'6px 8.5px 7px 8.5px'}}>{end_time}</div>:
                    this.props.fill ? <TimeSelect defaultValue={'5:00 pm'} variant="filled" IconComponent = {()=><div/>}
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={end_time}
                      onChange={handleEndTime}
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
                      {this.generateItems(true, start_time)}
                    </TimeSelect>
: <TimeSelect defaultValue={'5:00 pm'} IconComponent = {()=><div/>}
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={end_time}
                      onChange={handleEndTime}
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
                      {this.generateItems(true, start_time)}
                    </TimeSelect>
                }
                </div>
            </div>
        )
    }
}
