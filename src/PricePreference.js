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
      width:   65,
      border:  0,
      padding: 5,
  },
  input:{
      padding:5,
  }
})(FilledInput);


/**
 *  Represents user's preferred price range in dollars.
 *  Default: $5 - $20, able to be modified
 *
 *  @param low current min price preference
 *  @param high current max price preference
 *  @param handleLow handle user changes to min price preference
 *  @param handleHigh handle user changes to max price preference
 *  @param modifyStart whether write permissions are granted for start
 *  @param modifyEnd whether writer permissions are granted for end
 */
export default class PricePreference extends Component{
    constructor(props){
        super(props);
        this.state={
            modifyStart: false,
            modifyEnd: false,
        }
    }


    render(){
        let {low, high, handleLow, handleHigh} = this.props;
        let {modifyStart, modifyEnd} = this.state;
        return(
            <div className="flex mb2 pb1" style={{borderBottom:'1px solid #CCC', width:'100%'}}>
                <img className="mr2 pt1"  src={price} style={{width:24, height:24}} />
                <div className="mv2 mh1">$</div>
                <div onMouseEnter={()=>{this.setState({modifyStart:false})}}
         onMouseLeave={()=>{this.setState({modifyStart:false})}}>
                    {this.props.modify ? <div style={{fontSize:15, padding:'6px 8.5px 0px 8.5px'}}>{low}</div>:
                    <PriceSelect type='number' variant="filled" IconComponent = {()=><div/>}
                      value={low}
                      onChange={handleLow}
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
                    {this.props.modify ? <div style={{fontSize:15, padding:'6px 8.5px 7px 8.5px'}}>{high}</div>:
                    <PriceSelect defaultValue={'5:00 pm'} variant="filled" IconComponent = {()=><div/>}
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={high}
                      onChange={handleHigh}
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
