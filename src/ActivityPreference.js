import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import Fade from 'react-reveal';
import iconPrefMap from './PreferenceMap.js';
import dots from './img/dots.png';
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';

var moment = require('moment');


const ActivitySelect = withStyles({
  root: {
      fontFamily:'Raleway',
      fontSize:15,
      width:55,
      border: 0,
      padding: 5,
  },
  input:{
      padding:5,
  }
})(FilledInput);

const style = {
    textTransform: 'none',
    borderRadius: '25px',
    width: '150px',
};

/**
 *    Represents user's preferred activities.
 *
 */
export default class ActivityPreference extends Component{
    constructor(props){
        super(props);
        this.state={
            modifyStart: false,
            modifyEnd: false,
        }
    }

    getIconList = (categories) => {
        var arr = [];
        categories.forEach((category) => {
          if(arr.length <= 3) {
            arr.push(<img src={iconPrefMap[`${category}`]} style={{paddingRight: '5px', 'background-size': 'cover', display: 'flex', 'flex-direction': 'row', height: '30px'}}/>);
            if(arr.length == 3) {
              arr.push(<img src={dots} style={{paddingRight: '5px', paddingTop: '5px', 'background-size': 'cover', display: 'flex', 'flex-direction': 'row', height: '15px'}}/>);
            }
          }
        });
        return arr;
    }


    render(){
        let {preferences, handlePreferences} = this.props;
        let {modifyStart, modifyEnd} = this.state;
        return(
            <div className="flex mb2 pb2" style={{borderBottom:'1px solid #CCC', width:'100%'}}>
                <LocalActivityIcon className="mr2 pt1"  style={{width:24, height:24}} />
                <div onMouseEnter={()=>{this.setState({modifyStart:false})}}
         onMouseLeave={()=>{this.setState({modifyStart:false})}}>
                    {this.props.modify ?
                      <div className="flex flex-row" style={{fontSize:15, padding:'6px 8.5px 0px 8.5px'}}>{this.getIconList(preferences)}</div>

                      :

                      <EditIcon onClick={()=>{}} style={{paddingLeft: '10px', color: 'grey', cursor: 'pointer'}}/>
                }
                </div>
            </div>
        )
    }
}
