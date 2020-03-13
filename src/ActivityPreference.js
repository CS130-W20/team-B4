import React,{Component} from 'react';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import Fade from 'react-reveal';
import iconPrefMap from './PreferenceMap.js';
import dots from './img/dots.png';
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

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
 *      Represents user's preferred activities.
 *
 *      @param  modifyStart         whether write permissions are granted
 *      @param  modifyEnd           whether write permissions are granted
 *      @param  displayPrefOptions  whether activity preferences are currently displayed 
 *      @param  showRestOfPrefs     whether all of the user's activity preferences are currently displayed
 */
export default class ActivityPreference extends Component{
    constructor(props){
        super(props);
        this.state={
            modifyStart: false,
            modifyEnd: false,
            displayPrefOptions: false,
            showRestOfPrefs: false,
        }
    }

    getIconList = (categories) => {
        var arr = [];
        categories.forEach((category) => {
          if(!this.state.showRestOfPrefs) {
            if(arr.length < 3) {
              arr.push(<img key={category} src={iconPrefMap[`${category}`]} style={{paddingRight: '5px', backgroundSize: 'cover', display: 'flex', flexDirection: 'row', height: '30px'}}/>);
          }
          else if(arr.length == 3) {
                arr.push(<img key={category} src={dots} onClick={()=>{this.setState({showRestOfPrefs: true})}} style={{cursor: 'pointer', paddingRight: '5px', paddingTop: '5px', backgroundSize: 'cover', display: 'flex', flexDirection: 'row', height: '15px'}}/>);
              }
          } else {
            arr.push(<img src={iconPrefMap[`${category}`]} style={{paddingRight: '5px', 'background-size': 'cover', display: 'flex', 'flex-direction': 'row', height: '30px'}}/>);
          }
        });
        if(this.state.showRestOfPrefs)
          arr.push(<ArrowLeftIcon onClick={()=>{this.setState({showRestOfPrefs: false})}} style={{cursor: 'pointer', paddingRight: '5px', paddingTop: '5px', 'background-size': 'cover', display: 'flex', 'flex-direction': 'row', height: '30px'}}/>);
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
                        <div className="flex flex-wrap" style={{fontSize:15, padding:'6px 8.5px 0px 8.5px', maxWidth: '200px'}}>{this.getIconList(preferences)}</div>

                        :

                        <EditIcon onClick={()=>{this.props.edit()}} style={{paddingLeft: '10px', color: 'grey', cursor: 'pointer'}}/>
                  }
                  </div>
            </div>
        )
    }
}
