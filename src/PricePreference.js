import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import price from './img/price.png';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import Fade from 'react-reveal'
var moment = require('moment');


const PriceSelect = withStyles({
  root: {
      fontFamily:'Raleway',
      fontSize:15,
      width:50,
      border: 0,
      padding: 5,
  },
  input:{
      padding:5,
  }
})(FilledInput);

export default class PricePreference extends Component{
    constructor(props){
        super(props);
        this.state={
            low: 5,
            high: 20,
            modifyStart: true,
            modifyEnd: true
        }
    }

    generateItems = (is_high, low) => {
        var t = moment().set({
            'hour': is_high ? parseInt(low.substr(0,2)) + (low.substr(6,7) == 'pm' ? 12 : 0) : 0,
            'minute':is_high ? parseInt(low.substr(3, 5)) : 0})
        let l = [];
        let i = 0;
        while(i<48){
            l.push(<MenuItem value={t.format('hh:mm a')}>{t.format('hh:mm a')}</MenuItem>)
            t.add(30, 'm')
            i += 1;
            if((t.hour() == 23 && t.minute() == 30) || i > 48){
                l.push(<MenuItem value={t.format('hh:mm a')}>{t.format('hh:mm a')}</MenuItem>)
                break;
            }

        }
        return l;
    }

    render(){
        let {low, high ,modifyStart, modifyEnd} = this.state;
        return(
            <div className="flex">
                <img className="mr2 pt1"  src={price} style={{width:24, height:24}} />
                <div onMouseEnter={()=>{this.setState({modifyStart:false})}}
         onMouseLeave={()=>{this.setState({modifyStart:false})}}>
                    {modifyStart ? <div style={{fontSize:15, padding:'6px 8.5px 0px 8.5px'}}>{low}</div>:
                    <PriceSelect variant="filled" IconComponent = {()=><div/>}
                      value={low}
                      onChange={e=>{this.setState({low: e.target.value})}}
                      MenuProps={{
                        getContentAnchorEl: null,
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        }
                      }}
                    >
                    </PriceSelect>
                }
                </div>
                <div className="flex items-center mh1"><div style={{borderTop:'1px solid black', height:0, width:10}}/></div>
                <div onMouseEnter={()=>{this.setState({modifyEnd:false})}}
         onMouseLeave={()=>{this.setState({modifyEnd:false})}}>
                    {modifyEnd ? <div style={{fontSize:15, padding:'6px 8.5px 7px 8.5px'}}>{high}</div>:
                    <PriceSelect defaultValue={'5:00 pm'} variant="filled" IconComponent = {()=><div/>}
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={high}
                      onChange={e=>{this.setState({high: e.target.value})}}
                      MenuProps={{
                        getContentAnchorEl: null,
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        }
                      }}
                    >
                    </PriceSelect>
                }
                </div>
            </div>
        )
    }
}
