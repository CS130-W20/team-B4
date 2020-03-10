import React, {Component} from 'react';
import { withRouter, } from "react-router-dom";
import TopBar from './TopBar.js';
import TimePreference from './TimePreference.js';
import iconPrefMap from './PreferenceMap.js';
import userData from './Home.js';
import { fireAuth,db,storageRef } from "./fireApi";
import './Profile.css';
import firebase from 'firebase';
import {Zoom} from 'react-reveal';

import { createMuiTheme, ThemeProvider, withStyles} from '@material-ui/core/styles';
import {Slider, Checkbox, Button, FormControlLabel,  IconButton, Input} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
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
      width:   260,
      border:  0,
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
            id: null,
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
                  curData.id = doc.id;
                  if(curData.props.email !== undefined && curData.props.email == fireAuth.currentUser.email){
                      if(curData.props.pic){
                        this.getURL(curData.props.pic).then((url)=>{
                          this.setState({imgURL: url});
                        });

                      }
                    this.setState(
                      {
                        id:curData.id,
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

    handleCheck = (x) => {
        this.state.my_prefs.includes(`${x}`) ? this.setState(state => {
            const my_prefs = state.my_prefs.filter(c => c !== `${x}`);
            return { my_prefs,};
        }) : this.setState(state => {
            const my_prefs = state.my_prefs.concat(`${x}`);
            return { my_prefs,};
        })
    }
    handleChange = name => e => {
        this.setState({[name]: e.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    onSubmit = () =>{
        this.setState({
            view: true,
        });
        db.collection("users").doc(this.state.id).update({
            start_time:this.state.start_time,
            end_time:this.state.end_time,
            dist: this.state.distance,
            quote: this.state.blurb,
            high: this.state.price,
            preferences: firebase.firestore.FieldValue.arrayUnion(...this.state.my_prefs),
        })

    }

    setDistance = (event, newDistance) => {
        this.setState({distance: newDistance});
    }

    setPrice = (event, newPrice) => {
        this.setState({price: newPrice});
    }

    render() {
        const self = this;
        let food_choices = ["japanese", "italian", "indian", "chinese", "mediterranean", "thai", "korean", "mexican", "american", "fast_food", "dessert", "vegan"]
        let drink_choices = ["coffee", "juice","boba","bars"]
        let active_choices = ["kayaking", "hiking", "boat", "bicycle", "yoga", "climbing"]
        let misc_choices = ["museum", "beach", "cinema", "zoo", "arcade", "shopping"]
        return (
            <div className="prof flex flex-column">
            <TopBar toProfile={()=>{this.props.toProfile()}} toMainSession={()=>{this.props.toMainSession()}}/>
            {this.state.view ?
            <div className="editPage">
                <div className='mv3 title-display'/>
                <div className="flex flex-row" style={{height:'90%'}}>
                    <div style={{width:'35%'}} className="flex justify-end">
                        <Zoom>
                            <div className="flex flex-column gradient-box" style={{position:'relative', height:'84%'}}>
                                <div style={{position:'absolute', top:20, right:20, zIndex:2}}>
                                      <IconButton
                                        variant={"contained"}
                                        color={"primary"}
                                        onClick={()=>{this.setState({view:false})}}>
                                          <EditIcon />
                                      </IconButton>
                                </div>
                                <div className="flex flex-column items-center" style={{position:'relative', marginBottom:'30px'}} >
                                    <img src={this.state.imgURL} className="preview-profile-img"/>
                                </div>
                                <div className='fullname-display' style={{fontSize:'150%'}}>{this.state.name} </div>
                                <div className="username-display"> {this.state.username}</div>
                                <div className="divider"/>
                                <div className="mb3 blurb-display">"{this.state.blurb}"</div>
                                <LogisticalPreferences start_time={this.state.start_time} end_time={this.state.end_time} price={this.state.price} time={this.state.time} distance={this.state.distance}/>
                            </div>
                        </Zoom>
                    </div>
                    <div className="flex flex-column" style={{maxWidth:'65%'}}>
                        <Zoom>
                        <div className="prefBox">
                            <div className="PrefCategory"> Preferences </div>
                            <div className='flex flex-wrap'>
                                {this.state.my_prefs.map((item) => {return(
                                    <div key={iconPrefMap[`${item}`]} className="ma3">
                                        <img src={iconPrefMap[`${item}`]} className="activity-img"/>
                                        <div className="label"> {item} </div>
                                    </div>)})}
                            </div>
                        </div>
                        </Zoom>
                    </div>
                </div>
            </div>
            :
            <div className="editPage">
                <div className='mv3 title-display'/>
                <form onSubmit={this.handleSubmit}>
                    <div className="flex flex-row" style={{height:'100%'}}>
                        <div style={{width:'35%'}} className="flex justify-end">
                        <Zoom>
                        <EditLeftSide handleChange={this.handleChange} setPrice={this.setPrice} setDistance={this.setDistance} username={this.state.username} name={this.state.name} image={this.state.imgURL} price={this.state.price} dist={this.state.dist} start_time={this.state.start_time} end_time={this.state.end_time} price={this.state.price} time={this.state.time} distance={this.state.distance} blurb={this.state.blurb}/>
                        </Zoom>
                        </div>
                        <div className="flex flex-row justify-between pref">
                        <div className="flex flex-column" style={{width:'100%'}}>
                        <Zoom>
                            <PreferenceGroup name={"Food"} img={iconPrefMap.fork} handleCheck={this.handleCheck} my_prefs={this.state.my_prefs}  choices={food_choices}/>
                        </Zoom>
                        <Zoom>
                            <PreferenceGroup name={"Drinks"}img={iconPrefMap.drink} handleCheck={this.handleCheck} my_prefs={this.state.my_prefs}  choices={drink_choices}/>
                        </Zoom>
                        </div>
                        <div className="flex flex-column">
                        <Zoom>
                            <PreferenceGroup name={"Active"} img={iconPrefMap.active} handleCheck={this.handleCheck} my_prefs={this.state.my_prefs}  choices={active_choices}/>
                        </Zoom>
                        <Zoom>
                            <PreferenceGroup name={"Misc"} img={iconPrefMap.misc} handleCheck={this.handleCheck} my_prefs={this.state.my_prefs}  choices={misc_choices}/>
                        </Zoom>
                        </div>
                        </div>
                    </div>
                <div className="mt3">
                    <ThemeProvider theme={theme}>
                        <Button type={"submit"} variant={"contained"} onClick={this.onSubmit} theme={theme} color={"secondary"} style={style}> Save </Button>
                    </ThemeProvider>
                </div>
                <div className="message ph4 mt2" onClick={()=>{this.setState({view: true})}}> cancel </div>
                </form>
            </div>
            }
            </div>
        );
    }
}

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
            <div className="flex justify-start flex-column mh3">
                <div className="flex justify-start">
                <img src={iconPrefMap.clock} className="logistical-icon-img"/>
                <div className="logistical-pref-display"> {tp} </div>
                </div>
                <div className="flex justify-start mt2">
                <img src={iconPrefMap.road} className="logistical-icon-img"/>
                <div className="logistical-pref-display"> {dp} </div>
                </div>
                <div className="flex justify-start mt2">
                <img src={iconPrefMap.price} className="logistical-icon-img"/>
                <div className="logistical-pref-display"> {pp} </div>
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
    }

    render() {
        return (
            <div className="flex flex-column gradient-box">
                <div className="flex flex-column items-center" style={{position:'relative', marginBottom:'30px'}} >
                    <div style={{position:'absolute',top:0,left:20}}>
                        <input style={{display: "none"}} onChange={this.upload} accept="image/*" id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                              <PhotoCamera />
                            </IconButton>
                        </label>
                    </div>
                    <img src={this.state.picture} className="preview-profile-img"/>
                </div>
                <div className='fullname-display' style={{fontSize:'150%'}}>{this.props.name} </div>
                <div className="username-display"> {this.props.username}</div>
		        <div className="editblurb-display" > Edit blurb </div>
                <div className="mb3">
                    <ThemeProvider theme={theme}>
                        <BlurbStyle multiline={true} value={this.props.blurb} onChange={this.props.handleChange('blurb')} rowsMax="4" label="Edit blurb" id="filled-secondary"  InputLabelProps={{shrink: true,}}/>
                    </ThemeProvider>
                </div>
                <EditLogisticalPreferences handleChange={this.props.handleChange} setPrice={this.props.setPrice} setDistance={this.props.setDistance} distance={this.props.distance} start_time={this.props.start_time} end_time={this.props.end_time} price={this.props.price} time={this.props.time} distance={this.props.distance}/>
            </div>
        );
    }
}

/**
 *    Edit user's preferred time, location radius, and price range.
 */
function EditLogisticalPreferences(props){
    return (
        <div className="mh3">
            <div style={{display: 'flex', flexDirection: 'row'}}>
 	        <div> <TimePreference fill={false} start_time={props.start_time} end_time={props.end_time} handleStartTime={props.handleChange("start_time")} handleEndTime={props.handleChange("end_time")} modify={false}/> </div>
            </div>
            <div className="flex flex-row mt2" style={{paddingRight:'25px'}}>
            <img src={iconPrefMap.road} className="logistical-icon-img"/>
            <Slider
                value={props.distance}
                onChange={props.setDistance}
                valueLabelDisplay="auto"
                aria-labelledby="distance-slider"
                min={1}
                max={50}
                valueLabelFormat={distanceValueLabelFormat}
            />
            </div>
            <div className="flex flex-row mt3"style={{paddingRight:'27px'}}>
            <img src={iconPrefMap.price} className="logistical-icon-img"/>
            <Slider
                value={props.price}
                onChange={props.setPrice}
                valueLabelDisplay="auto"
                aria-labelledby="price-slider"
                min={0}
                max={120}
                valueLabelFormat={priceValueLabelFormat}
                step={null}
                marks={[ { value: 10, label: "$", }, { value: 30, label: "$$", }, { value: 60, label: "$$$", }, { value: 120, label: "$$$$", },]}
            />
            </div>
        </div>
    );
}


function Option(props){ return(
    <ThemeProvider theme={theme}>
        <FormControlLabel selected={true} control={
            <Checkbox checked={props.checked} onChange={props.handleCheck} icon={<img src={iconPrefMap[`${props.choice}`]} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap[`${props.choice}`]} className='checked-img'/>}/>}
        label={props.choice}/>
    </ThemeProvider>)}


class PreferenceGroup extends React.Component {
    render() {
        let {my_prefs, choices, name} = this.props;
        let c = "category3-img";
        if(name == "Food" || name == "Drink") c = "category-img";
        else if(name == "Active") c = "category2-img";
        return(
            <div className="flex flex-column miscBox">
                <div className="flex flex-row"><img src={this.props.img} className={c}/><div className="PrefCategory pt2 ph2">{this.props.name}</div></div>
                <div className="flex flex-wrap">
                    {choices.map(choice => <Option key={choice} choice={choice} handleCheck={()=>{this.props.handleCheck(choice)}} checked={my_prefs.includes(choice)}/>)}
                </div>
            </div>
        );
    }
}
export default withRouter(Profile);
