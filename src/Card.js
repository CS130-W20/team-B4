import React, {Component} from 'react';
import './Card.css';
import {Zoom} from 'react-reveal';
import Pulse from 'react-reveal/Pulse'
import TimePreference from './TimePreference.js';
import PricePreference from './PricePreference.js';
import DistancePreference from './DistancePreference.js';
import ActivityPreference from './ActivityPreference.js';
import edit from './img/edit2.png';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import iconPrefMap from './PreferenceMap.js';
import {Slider, Checkbox, Button, FormControlLabel, TableRow, FormGroup, TextField, Typography, IconButton, Input} from '@material-ui/core';
import { createMuiTheme, ThemeProvider, withStyles, makeStyles } from '@material-ui/core/styles';


/**
 *    Represents user profile. [Currently has sample data.]
 *    [WIP] will fetch actual user data from Firebase database.
 */

 const theme = createMuiTheme({
     overrides: {
         MuiFormControlLabel: {
             label: {
                 '&$selected': {
                   color: '#F00',
                 },
                 fontSize: '15px',
                 fontFamily: 'Raleway',
             },
         },
     }
 });


export default class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            start_time: this.props.data.start_time,
            end_time:   this.props.data.end_time,
            first_name: this.props.data.first_name,
            quote:      this.props.data.quote,
            low:        this.props.data.low,
            high:       this.props.curPricePrefs,
            prefs:      this.props.curPrefs,
            dist:       this.props.data.dist,

            imgURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',

            displayActivityPrefs: false,
            modify: true,
        }
    }

    /**
     *    Updates preference with user entered value.
     */
    handleChange = name => e => {
        this.setState({[name]: e.target.value});
    }
    handleHigh = name => e =>{
      this.setState({high:e.target.value});
      this.props.updateHomePrefs(this.props.data.username, parseInt(e.target.value), 'price');
    }

    componentDidMount(props){
        if(this.props.imgURL)
            this.props.imgURL.then((url)=>{this.setState({imgURL: url})});
    }

    handleCheck = (x) => {
        this.state.prefs.includes(`${x}`) ? this.setState(state => {
            const prefs = state.prefs.filter(c => c !== `${x}`);
            this.props.updateHomePrefs(this.props.data.username, prefs, 'activities');
            return { prefs,};
        }) : this.setState(state => {
            const prefs = state.prefs.concat(`${x}`);
            this.props.updateHomePrefs(this.props.data.username, prefs, 'activities');
            return { prefs,};
        });
    }

    genActivityOptions = () => {
      const options = ['italian', 'japanese', 'chinese', 'pizza', 'mediterranean', 'mexican', 'korean', 'fast_food', 'dessert', 'american', 'vegan', 'indian', 'thai', 'juice', 'bars', 'boba', 'coffee', 'bicycle', 'boat', 'beach', 'kayaking', 'hiking', 'yoga', 'climbing', 'museum', 'cinema', 'zoo', 'arcade', 'shopping'];
      return options.map((item) => {
        //return <div key={iconPrefMap[`${item}`]} className="ma2"> {<img src={iconPrefMap[`${item}`]} style={{'background-size': 'cover', display: 'flex', 'flex-direction': 'row', height: '30px'}}/>} <div className="label-card"> {item} </div> </div>
        return <Option key={item} choice={item} handleCheck={()=>{this.handleCheck(item)}} checked={this.state.prefs.includes(item)}/>
      })
    }

    render(){
        const {data} = this.props;
        const {imgURL, displayActivityPrefs} = this.state;
        const {first_name, quote, low, high, dist, start_time, end_time} = this.state;
        return(
            <Zoom opposite>
                <div className="pa4 ma3 card">
                    <div className="flex flex-column items-center" style={{width:'100%'}}>
                        <div className="flex flex-row justify-between" style={{top:'-11px', position:'relative', width:'100%', flexDirection: "row", JustifyContent: "space-between"}}>
                            <CloseIcon style={{cursor: "pointer"}} onClick={()=>{this.props.deleteCard(this.props.data)}}/>
                            {this.state.modify ?
                            <img className="pv1" onClick={()=>{this.props.handleModify();   this.setState({modify:!this.state.modify})}} src={edit} style={{width:20, height:20, cursor: 'pointer'}}/>:  <div className="pv1 ph2" style={{borderRadius:4, border:'1px solid #888', cursor: 'pointer'}} onClick={()=>{this.props.handleModify();this.setState({modify:!this.state.modify})}} > save </div>
                            }
                        </div>
                        <div className="profilePic" style={{backgroundImage:`url('${imgURL}')`}}/>
                        <div className="name pv2" >{first_name}</div>
                        <div className="quote">{quote}</div>
                        <div className="mv2 div"/>
                        <div className="flex flex-column items-start">
                         <TimePreference   start_time={start_time} end_time={end_time} handleStartTime={this.handleChange("start_time")} handleEndTime={this.handleChange("end_time")} modify={this.state.modify} fill={true}/>
                         <PricePreference  low={low} high={high}   handleLow={this.handleChange("low")} handleHigh={this.handleHigh()} modify={this.state.modify}/>
                         <DistancePreference dist={dist} handleDist={this.handleChange("dist")} modify={this.state.modify}/>
                         <ActivityPreference preferences={this.state.prefs} handlePreferences={this.handlePreferenceChange} modify={this.state.modify} edit={() => {this.setState({displayActivityPrefs: true})}}/>
                        </div>
                    </div>
                </div>
                    {displayActivityPrefs ?
                        <div style={{zIndex:4}}>
                    <Pulse duration={500}>
                    <div className="prefEditBox">
                      <div className="flex flex-row mh2">
                          <ArrowBackIcon style={{cursor: 'pointer', paddingTop: '8px'}} onClick={()=>{this.setState({displayActivityPrefs: false})}}/>
                          <div className="name pv2" style={{}} >{data.first_name}'s Preferences</div>
                      </div>
                      <div className="flex flex-wrap" style={{maxWidth: '600px'}}>
                        {this.genActivityOptions()}
                      </div>
                    </div></Pulse></div>:<div/>}
            </Zoom>
        )

    }

}

function Option(props){ return(
    <ThemeProvider theme={theme}>
        <FormControlLabel selected={true} control={
            <Checkbox checked={props.checked} onChange={props.handleCheck} icon={<img src={iconPrefMap[`${props.choice}`]} className='checkbox-img-card'/>} checkedIcon={<img src={iconPrefMap[`${props.choice}`]} className='checked-img-card'/>}/>}
        label={props.choice}/>
    </ThemeProvider>)}
