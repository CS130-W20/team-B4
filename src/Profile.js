import React, {Component} from 'react';
import { withRouter, BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import TopBar from './TopBar.js';
import TimePreference from './TimePreference.js';
import iconPrefMap from './PreferenceMap.js';
import userData from './Home.js';
import { fireAuth,db,storageRef } from "./fireApi";
import './Profile.css';

import { createMuiTheme, ThemeProvider, withStyles, makeStyles } from '@material-ui/core/styles';
import { lightBlue, blue, purple} from '@material-ui/core/colors';
import {Slider, Checkbox, Button, FormControlLabel, TableRow, FormGroup, TextField, Typography, IconButton, Input} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';



const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#448aff',
        },
        secondary: {
            main: '#2962ff',
        }
    },
    overrides: {
        MuiButton: {
            label: {
                color: '#ffffff',
            },
        },
        MuiFormControlLabel: {
            label: {
                '&$selected': {
                  color: '#F00',
                },
                fontSize: '15px',
                fontFamily: 'Raleway',
            },
        },
        MuiSlider: {
            rail: {
                color: '#448aff',
            },
        }
    }
});



const style = {
    textTransform: 'none',
    borderRadius: '25px',
    width: '150px',
};

const BlurbStyle = withStyles({
  root: {
      fontFamily:'Raleway',
      fontSize:14,
      width:   230,
      border:  0,
      padding: 5,
  },
  input:{
      padding:5,
  }
})(Input);

function timeValueLabelFormat(time) {
    return ((time+11)%12+1) + ((time%24<12) ? "AM" : "PM");
}

function distanceValueLabelFormat(distance) {
    return distance+"mi";
}

function distanceValueLabelFormatDisplay(distance) {
    return distance+" mi";
}

function priceValueLabelFormat(price) {
    return (price<=60) ? "$"+price : "$61+";
}


/**
 *    Represents a user profile. [Currently has sample data.]
 *
 *    @param [WIP] user data fetched from Firebase database
 */
class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            imgURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            logged_in: props.location.state ? props.location.state.logged_in : false,
            edit: props.location.state ? props.location.state.edit : false,
            view: false,
            edit_pg1: true,
            name: '',
            username: "",
            blurb: "",
            my_prefs: [],
            price: 60,
	        start_time: "",
	        end_time: "",
            time: [19, 21],
            distance: 30
        }
        for (var i = 0; i < this.state.my_prefs.length; i++) {
            this.state.my_pref_map.push({
                word: this.state.my_prefs[i],
                pic: this.state.pref_map[this.state.my_prefs[i]]
            });
        }
        this.state.view = !this.state.logged_in || !this.state.edit;
    }

    getURL = (p) => storageRef.child(p).getDownloadURL();


    componentWillMount(){
      db.collection("users").get().then((querySnapshot) => {
              querySnapshot.forEach((doc)=>{
                  var curData = new userData(doc.data());
                  if(curData.props.email !== undefined && curData.props.email == fireAuth.currentUser.email){
                      if(curData.props.pic){
                        this.getURL(curData.props.pic).then((url)=>{
                          this.setState({imgURL: url});
                        });

                      }
                    this.setState(
                      {
                        name: curData.props.first_name,
                        username: '@'+curData.props.username,
                        blurb: curData.props.quote,
                        my_prefs: curData.props.preferences,
			            start_time: curData.props.start_time,
			            end_time: curData.props.end_time,
			            distance: curData.props.dist,
                        price: curData.props.high,
                      });
                  }
                });
          });
    }


    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        const self = this;
        return (
            <div className="prof flex flex-column">
            <TopBar toProfile={()=>{this.props.toProfile()}} toMainSession={()=>{this.props.toMainSession()}}/>
            {this.state.view ?
            <div>
                <div style={{marginLeft: '1%', marginTop: '4.5%', position: 'absolute'}} onClick={()=>{this.setState({'view': false})}}>
                    <img src={iconPrefMap.edit} className='edit-img'/>
                </div>
                <div style={{marginLeft: '10%', position: 'absolute'}}>
                    <LeftSide image={this.state.imgURL} start_time={this.state.start_time} end_time={this.state.end_time} price={this.state.price} time={this.state.time} distance={this.state.distance}/>
                </div>
                <div style={{marginLeft: '48%', marginTop: '10%', position: 'absolute'}} className='fullname-display'>
                    {this.state.name}
                </div>
                <div style={{marginLeft: '48%', marginTop: '14%', position: 'absolute'}} className='username-display'> {this.state.username} </div>
                <div style={{marginLeft: '48%', marginTop: '17%', position: 'absolute'}} className='blurb-display'> {this.state.blurb} </div>
                <div style={{marginLeft: '48%', marginTop: '21%'}} className='username-display2'> {this.state.username} is down for... </div>
                <div style={{marginLeft: '48%', marginTop: '24%', position: 'absolute'}}> <RightSide my_prefs={this.state.my_prefs} /> </div>
            </div>
            :
            <div className="editPage">
                <div className='mv4 title-display'> Edit Profile </div>
                <form onSubmit={this.handleSubmit} >
                    <div style={{position:'absolute'}}>
                    <EditLeftSide image={this.state.imgURL} price={this.state.price} dist={this.state.dist} start_time={this.state.start_time} end_time={this.state.end_time} price={this.state.price} time={this.state.time} distance={this.state.distance} blurb={this.state.blurb}/>
                    </div>
                    <div className="flex flex-wrap pref">
                        <FoodOptions my_prefs={this.state.my_prefs}/>
                        <DrinkOptions my_prefs={this.state.my_prefs}/>
                        <ActiveOptions my_prefs={this.state.my_prefs}/>
                        <MiscOptions my_prefs={this.state.my_prefs}/>
                    </div>
                <div style={{marginTop: '5%', marginLeft: '45%', position: 'absolute'}} className="justify-center"> <ThemeProvider theme={theme}> <Button type={"submit"} variant={"contained"} onClick={()=>{this.setState({'view': true})}} theme={theme} color={"secondary"} style={style}> Save </Button> </ThemeProvider> </div>
                <div style={{marginTop: '8%', marginLeft: '46.5%', fontSize:15, textDecoration:'underline', position: 'absolute'}} className="message ph4 mt2" onClick={()=>{this.setState({view: 'true'})}}> cancel </div>
                </form>
            </div>
            }
            </div>
        );
    }
}

/**
 *  Contains basic user info. Includes user's picture and logistics.
 */
class LeftSide extends Component {
    render() {
        return (
            <div>
                <div style={{marginTop: '45%'}} className='gradient-box'>
                <div style={{marginTop: '10%', marginLeft: '16%',position: 'absolute'}}> <img src={this.props.image} className="profile-img"/> </div>
                <div style={{marginTop: '75%', marginLeft: '16%', position: 'absolute'}}> <LogisticalPreferences start_time={this.props.start_time} end_time={this.props.end_time} price={this.props.price} time={this.props.time} distance={this.props.distance}/> </div>
                </div>
            </div>
        );
    }
}

/**
 *    Contains user's preferred time, location radius, and price range.
 */
class LogisticalPreferences extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        {/*const tp = timeValueLabelFormat(this.props.time[0]) + " - " + timeValueLabelFormat(this.props.time[1]);*/}
        const tp = this.props.start_time + " - " + this.props.end_time;
        const dp = "<" + distanceValueLabelFormatDisplay(this.props.distance);
        {/*const pp = (this.props.price <= 0 ? "" : (priceValueLabelFormat(0)) + " - ") + priceValueLabelFormat(this.props.price);*/}
        const pp = "<" + priceValueLabelFormat(this.props.price);
        return (
            <div>
                <div>
                <img src={iconPrefMap.clock} className="logistical-icon-img"/>
                <div className="logistical-pref-display"> {tp} </div>
                </div>
                <div style={{marginTop: '5%'}}>
                <img src={iconPrefMap.road} className="logistical-icon-img"/>
                <div className="logistical-pref-display"> {dp} </div>
                </div>
                <div style={{marginTop: '5%'}}>
                <img src={iconPrefMap.price} className="logistical-icon-img"/>
                <div className="logistical-pref-display"> {pp} </div>
                </div>
            </div>
        );
    }
}

/**
 *    Contains user's preferred activities, name, username, and tagline (bio).
 */
class RightSide extends Component {
    render() {
        const my_prefs = this.props.my_prefs;
        const manyPrefs = (my_prefs.length > 8);
        return (
            <div>
                <div className='row'> {
                    my_prefs.slice(0,4).map( (item) => { return <div key={iconPrefMap[`${item}`]} style={{marginRight: '65px'}}> {<img src={iconPrefMap[`${item}`]} className="activity-img"/>} <div className="label"> {item} </div> </div> })
                } </div>
                <div>
                    { manyPrefs ? (
                    <div style={{marginTop: '65px'}} className='row'>
                    {my_prefs.slice(4,7).map(  (item) => { return <div key={iconPrefMap[`${item}`]} style={{marginRight: '65px'}}> {<img src={iconPrefMap[`${item}`]} className="activity-img"/>} <div className="label"> {item} </div> </div> })}
                    <Popup trigger={<img src={iconPrefMap.dots} className="dots"/>} position="right center">
                        <div> {my_prefs.slice(7,my_prefs.length).map( (item) => { return <div key={iconPrefMap[`${item}`]} style={{marginRight: '65px'}}> {<img src={iconPrefMap[`${item}`]} className="activity-img"/>} <div className="label"> {item} </div> </div> })} </div>
                    </Popup>
                    </div> ) : (
                    <div style={{marginTop: '65px'}} className='row'>
                    {my_prefs.slice(4,8).map(  (item) => { return <div key={iconPrefMap[`${item}`]} style={{marginRight: '65px'}}> {<img src={iconPrefMap[`${item}`]} className="activity-img"/>} <div className="label"> {item} </div> </div> })}
                    </div>)}
                </div>
            </div>
        );
    }
}

/**
 *  Edit user's preferred price, time, and distance.
 *  Edit user's profile photo and blurb/bio.
 */
class EditLeftSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: this.props.image,
        }
        this.upload = this.upload.bind(this);
    }

    upload(e) {
        this.setState({picture: URL.createObjectURL(e.target.files[0])});
        console.log(this.state.picture);
    }

    render() {
        return (
            <div>
                <div style={{marginTop: '10%'}} className='gradient-box'>
                <div style={{display: 'flex', flexDirection: 'row', marginLeft: '5%', marginTop: '5%'}}>
                <input style={{display: "none"}} onChange={this.upload} accept="image/*" id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label> </div>
                <div className="flex flex-column items-center" style={{marginLeft: '22.5%', position: 'absolute'}}> <img src={this.state.picture} className="preview-profile-img"/> </div>
		<div className="editblurb-display" style={{marginLeft: '10%', marginTop: '52%', position: 'absolute'}}> Edit blurb </div>
                <div style={{marginLeft: '10%', marginTop: '56%', position: 'absolute'}}> <ThemeProvider theme={theme}> <BlurbStyle multiline={true} rowsMax="4" label="Edit blurb" id="filled-secondary" defaultValue={this.props.blurb} InputLabelProps={{shrink: true,}}/> </ThemeProvider> </div>
                <div style={{marginTop: '82%', marginLeft: '7%', position: 'absolute'}}> <EditLogisticalPreferences distance={this.props.distance} start_time={this.props.start_time} end_time={this.props.end_time} price={this.props.price} time={this.props.time} distance={this.props.distance}/> </div>
                </div>
            </div>
        );
    }
}

/**
 *    Edit user's preferred time, location radius, and price range.
 */
class EditLogisticalPreferences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stime: this.props.start_time,
            etime: this.props.end_time,
            modify: true,
        }
    }
    handleChange = name => e => {
        this.setState({[name]: e.target.value});
    }
    componentDidMount(props) {
        console.log(this.state.stime);
        console.log(this.state.etime);
    }
    render() {
        const tp = "Change Time Preference";
        const dp = "Change Distance Preference";
        const pp = "Change Price Preference";
        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
	 	        <div> <TimePreference fill={false} start_time={this.state.stime} end_time={this.state.etime} handleStartTime={this.handleChange("stime")} handleEndTime={this.handleChange("etime")} modify={false}/> </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '4%'}}>
                <img src={iconPrefMap.road} className="logistical-icon-img"/>
                <DistanceSlider distance={this.props.distance}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '8%'}}>
                <img src={iconPrefMap.price} className="logistical-icon-img"/>
                <PriceSlider price={this.props.price}/>
                </div>
            </div>
        );
    }
}

class TimeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.time
        }
    }
    render() {
        const setTime = (event, newTime) => {
            this.setState({time: newTime});
        }
        return(
            <div>
            <Typography id="time-slider"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Typography>
            <Slider
                value={this.state.time}
                onChange={setTime}
                valueLabelDisplay="auto"
                aria-labelledby="time-slider"
                min={0}
                max={24}
                valueLabelFormat={timeValueLabelFormat}
            />
            </div>
        );
    }
}

class DistanceSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: this.props.distance
        }
    }
    render() {
        const setDistance = (event, newDistance) => {
            this.setState({distance: newDistance});
        }
        return(
            <Slider
                value={this.state.distance}
                onChange={setDistance}
                valueLabelDisplay="auto"
                aria-labelledby="distance-slider"
                min={1}
                max={50}
                valueLabelFormat={distanceValueLabelFormat}
            />
        );
    }
}

class PriceSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: this.props.price
        }
    }
    render() {
        const setPrice = (event, newPrice) => {
            this.setState({price: newPrice});
        }
        return(
            <Slider
                value={this.state.price}
                onChange={setPrice}
                valueLabelDisplay="auto"
                aria-labelledby="price-slider"
                min={0}
                max={120}
                valueLabelFormat={priceValueLabelFormat}
                step={null}
                marks={[
                    {
                        value: 10,
                        label: "$10",
                    },
                    {
                        value: 30,
                        label: "$30",
                    },
                    {
                        value: 60,
                        label: "$60",
                    },
                    {
                        value: 120,
                        label: "$61+",
                    },
                ]}
            />
        );
    }
}

/*
 * Display/modify the available food activity options.
*/

function MiscComp(props){ return(
    <ThemeProvider theme={theme}>
        <FormControlLabel selected={true} control={
            <Checkbox checked={props.checked} onChange={props.handleCheck} icon={<img src={iconPrefMap[`${props.choice}`]} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap[`${props.choice}`]} className='checked-img'/>}/>}
        label={props.choice}/>
    </ThemeProvider>)}

class FoodOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedValues: this.props.my_prefs,
            italian: false,
        }
    }

    handleCheck(x) {
        this.state.checkedValues.includes(`${x}`) ? this.setState(state => {
            const checkedValues = state.checkedValues.filter(c => c !== `${x}`);
            return { checkedValues,};
        }) : this.setState(state => {
            const checkedValues = state.checkedValues.concat(`${x}`);
            return { checkedValues,};
        })
    }

    render() {
        let {checkedValues} = this.state;
        let choices = ["japanese", "italian", "indian", "chinese", "mediterranean", "thai", "korean", "mexican", "american", "fast_food", "dessert", "vegan"]
        return(
            <div className="flex flex-column miscBox">
                <img src={iconPrefMap.fork} className='category-img'/>
                <div className="flex flex-wrap">
                {choices.map(c=>
                    <MiscComp choice={c} handleCheck={()=>{this.handleCheck(c)}} checked={checkedValues.includes(c)}/>)
                }
                </div>
            </div>
        );
    }
}

/*
 * Display/modify the available drink-related activity options.
*/


class DrinkOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedValues: this.props.my_prefs,
        }
    }
    handleCheck(x) {
        this.state.checkedValues.includes(`${x}`) ? this.setState(state => {
            const checkedValues = state.checkedValues.filter(c => c !== `${x}`);
            return { checkedValues,};
        }) : this.setState(state => {
            const checkedValues = state.checkedValues.concat(`${x}`);
            return { checkedValues,};
        })
    }
    render() {
        let choices = ["coffee", "juice","boba","bars"]
        let {checkedValues} = this.state;
        return(
            <div className="flex flex-column miscBox">
                <img src={iconPrefMap.drink} className='category-img'/>
                <div className="flex flex-wrap">
                {choices.map(c =>
                    <MiscComp choice={c} handleCheck={()=>{this.handleCheck(c)}} checked={checkedValues.includes(c)}/>
                )}
                </div>
            </div>
        );
    }
}

/*
 * Display/modify the available active/exercise-related activity options.
*/

class ActiveOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedValues: this.props.my_prefs,
        }
    }
    handleCheck(x) {
        this.state.checkedValues.includes(`${x}`) ? this.setState(state => {
            const checkedValues = state.checkedValues.filter(c => c !== `${x}`);
            return { checkedValues,};
        }) : this.setState(state => {
            const checkedValues = state.checkedValues.concat(`${x}`);
            return { checkedValues,};
        })
    }
    render() {
        let {checkedValues} = this.state;
        let choices = ["kayaking", "hiking", "boat", "bicycle", "yoga", "climbing"]
        return(
            <div className="flex flex-column miscBox">
                <img src={iconPrefMap.active} className='category2-img'/>
                <div className="flex flex-wrap">
                {choices.map(c =>
                    <MiscComp choice={c} handleCheck={()=>{this.handleCheck(c)}} checked={checkedValues.includes(c)}/>
                )}
                </div>
            </div>
        );
    }
}

/*
 * Display/modify the available miscellaneous/other activity options.
*/


class MiscOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedValues: this.props.my_prefs,
        }
    }
    handleCheck(x) {
        this.state.checkedValues.includes(`${x}`) ? this.setState(state => {
            const checkedValues = state.checkedValues.filter(c => c !== `${x}`);
            return { checkedValues,};
        }) : this.setState(state => {
            const checkedValues = state.checkedValues.concat(`${x}`);
            return { checkedValues,};
        })
    }
    render() {
        let {checkedValues} = this.state;
        let choices = ["museum", "beach", "cinema", "zoo", "arcade", "shopping"]
        return(
            <div className="flex flex-column miscBox">
                <img src={iconPrefMap.misc} className='category3-img'/>
                <div className="flex flex-wrap">
                    {choices.map(choice => <MiscComp choice={choice} handleCheck={()=>{this.handleCheck(choice)}} checked={checkedValues.includes(choice)}/>)}
                </div>
            </div>
        );
    }
}
export default withRouter(Profile);
