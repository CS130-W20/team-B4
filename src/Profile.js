import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import './Profile.css';
import { fireAuth } from "./fireApi";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import TopBar from './TopBar.js';

/* icon image import */
import iconPrefMap from './PreferenceMap.js';

/* UserData/Firebase stuff */
import userData from './Home.js';
import {db, storageRef} from './fireApi';

/* Material-UI stuff */
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import Slider from "@material-ui/core/Slider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TableRow from "@material-ui/core/TableRow";
import FormGroup from "@material-ui/core/FormGroup";

/* misc icons */
import clock from './img/clock.png';
import road from './img/road.png';
import price from './img/price.png';
import edit from './img/edit.png';
import logout from './img/arrow_white.png';
import dots from './img/dots.png';
import blue_circle from './img/circle_blue.png';
import grey_circle from './img/circle_grey.png';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
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
                fontSize: '15px',
                fontFamily: 'Raleway',
            },
        }
    }
});

const style = {
    textTransform: 'none',
    borderRadius: '25px',
    width: '150px',
};

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
            view: true,
            edit_pg1: true,
            name: '',
            username: "",
            blurb: "",
            my_prefs: [],
            price: 60,
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
                    this.getURL(curData.props.pic).then((url)=>{
                      this.setState({imgURL: url});
                    });
                    this.setState(
                      {
                        name: curData.props.name,
                        username: '@'+curData.props.username,
                        blurb: curData.props.quote,
                        my_prefs: curData.props.preferences,
                      });
                  }
                });
          });
    }

    render() {
        const self = this;
        return (
            <div>
            <div> <TopBar/> </div>
            {this.state.view ?
            <div>
                <div style={{marginLeft: '1%', marginTop: '4.5%', position: 'absolute'}} onClick={()=>{this.setState({'view': false})}}> <img src={edit} className='edit-img'/> </div>
                <div style={{marginLeft: '10%', position: 'absolute'}}> <LeftSide image={this.state.imgURL} price={this.state.price} time={this.state.time} distance={this.state.distance}/> </div>
                <div style={{marginLeft: '48%', marginTop: '10%', position: 'absolute'}} className='fullname-display'>
                    {this.state.name}
                </div>
                <div style={{marginLeft: '48%', marginTop: '14%', position: 'absolute'}} className='username-display'> {this.state.username} </div>
                <div style={{marginLeft: '48%', marginTop: '17%', position: 'absolute'}} className='blurb-display'> {this.state.blurb} </div>
                <div style={{marginLeft: '48%', marginTop: '21%'}} className='username-display2'> {this.state.username} is down for... </div>
                <div style={{marginLeft: '48%', marginTop: '24%', position: 'absolute'}}> <RightSide my_prefs={this.state.my_prefs} /> </div>
            </div>
            :
            <div>
            <div style={{marginTop: '42%', marginLeft: '45%', position: 'absolute'}} className="justify-center"> <ThemeProvider theme={theme}> <Button variant={"contained"} onClick={()=>{this.setState({'view': true})}} theme={theme} color={"secondary"} style={style}> Save </Button> </ThemeProvider> </div>
            <div style={{marginTop: '45%', marginLeft: '46.5%', fontSize:15, textDecoration:'underline', position: 'absolute'}} className="message ph4 mt2" onClick={()=>{this.setState({view: 'true'})}}> cancel </div>
            <div>
                <div style={{marginLeft: '45%', marginTop: '5.5%', position: 'absolute'}} className='title-display'> Edit Preferences </div>
                <form>
                <div style={{marginLeft: '2.5%', position: 'absolute'}}> <EditLeftSide image={this.state.imgURL} price={this.state.price} time={this.state.time} distance={this.state.distance}/> </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '34.75%', marginTop: '10%', position: 'absolute'}}>
                <img src={iconPrefMap.fork} className='category-img'/>
                {/*<div style={{marginLeft: '40%', marginTop: '25%', position: 'absolute'}} className='category-display'> Food </div>*/}
                </div>
                <div> <FoodOptions/> </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '34.75%', marginTop: '30%', position: 'absolute'}}>
                <img src={iconPrefMap.drink} className='category-img'/>
                </div>
                <div> <DrinkOptions/> </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '69.75%', marginTop: '9.5%', position: 'absolute'}}>
                <img src={iconPrefMap.active} className='category2-img'/>
                </div>
                <div> <ActiveOptions/> </div>
                {/*<div>
                    {this.state.edit_pg1 ?
                    <div>
                        <div style={{marginTop: '40%', marginLeft: '49%', position: 'absolute'}}> <img src={blue_circle} className='circle-img'/> </div>
                        <div style={{marginTop: '40%', marginLeft: '51%', position: 'absolute'}} onClick={()=>{this.setState({edit_pg1: 'false'})}}> <img src={grey_circle} className='circle-img'/> </div>
                    </div>
                    :
                    <div>
                        <div style={{marginTop: '40%', marginLeft: '49%', position: 'absolute'}} onClick={()=>{this.setState({edit_pg1: 'true'})}}> <img src={grey_circle} className='circle-img'/> </div>
                        <div style={{marginTop: '40%', marginLeft: '51%', position: 'absolute'}}> <img src={blue_circle} className='circle-img'/> </div>
                    </div>}
                </div>*/}
                <div style={{marginTop: '42%', marginLeft: '45%', position: 'absolute'}} className="justify-center"> <ThemeProvider theme={theme}> <Button variant={"contained"} onClick={()=>{this.setState({'view': true})}} theme={theme} color={"secondary"} style={style}> Save </Button> </ThemeProvider> </div>
                <div style={{marginTop: '45%', marginLeft: '46.5%', fontSize:15, textDecoration:'underline', position: 'absolute'}} className="message ph4 mt2" onClick={()=>{this.setState({view: 'true'})}}> cancel </div>
                </form>
            </div>
            </div> }
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
                <div style={{marginTop: '30px', marginLeft: '50px',position: 'absolute'}}> <img src={this.props.image} className="profile-img"/> </div>
                <div style={{marginTop: '200px', marginLeft: '70px', position: 'absolute'}}> <LogisticalPreferences price={this.props.price} time={this.props.time} distance={this.props.distance}/> </div>
                </div>
            </div>
        );
    }
}

/**
 *    Contains user's preferred time, location radius, and price range.
 */
class LogisticalPreferences extends React.Component {
    render() {
        const tp = timeValueLabelFormat(this.props.time[0]) + " - " + timeValueLabelFormat(this.props.time[1]);
        const dp = "<" + distanceValueLabelFormatDisplay(this.props.distance);
        const pp = (this.props.price <= 0 ? "" : (priceValueLabelFormat(0)) + " - ") + priceValueLabelFormat(this.props.price);
        return (
            <div style={{marginTop: '60px', marginLeft: '10px'}}>
                <div>
                <img src={clock} className="logistical-icon-img"/>
                <div className="logistical-pref-display"> {tp} </div>
                </div>
                <div style={{marginTop: '20px'}}>
                <img src={road} className="logistical-icon-img"/>
                <div className="logistical-pref-display"> {dp} </div>
                </div>
                <div style={{marginTop: '20px'}}>
                <img src={price} className="logistical-icon-img"/>
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
                    <Popup trigger={<img src={dots} className="dots"/>} position="right center">
                        <div> {my_prefs.slice(7,my_prefs.length).map( ({word, pic} ) => {return <div key={pic} className="tag-popup"> {word} </div>})} </div>
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
 *  Price, time, distance
 */
class EditLeftSide extends Component {
    render() {
        return (
            <div>
                <div style={{marginTop: '45%'}} className='gradient-box'>
                <div style={{marginTop: '30px', marginLeft: '50px',position: 'absolute'}}> <img src={this.props.image} className="profile-img"/> </div>
                <div style={{marginTop: '200px', marginLeft: '15px', position: 'absolute'}}> <EditLogisticalPreferences price={this.props.price} time={this.props.time} distance={this.props.distance}/> </div>
                </div>
            </div>
        );
    }
}

/**
 *    Edit user's preferred time, location radius, and price range.
 */
class EditLogisticalPreferences extends React.Component {
    render() {
        const tp = "Change Time Preference";
        const dp = "Change Distance Preference";
        const pp = "Change Price Preference";
        return (
            <div style={{marginTop: '60px', marginLeft: '10px'}}>
                <div>
                <img src={clock} className="logistical-icon-img"/>
                <div className="logistical-pref-display"> {tp} </div>
                </div>
                <TimeSlider time={this.props.time}/>
                <div style={{marginTop: '20px'}}>
                <img src={road} className="logistical-icon-img"/>
                <div className="logistical-pref-display"> {dp} </div>
                </div>
                <DistanceSlider distance={this.props.distance}/>
                <div style={{marginTop: '20px'}}>
                <img src={price} className="logistical-icon-img"/>
                <div className="logistical-pref-display"> {pp} </div>
                </div>
                <PriceSlider price={this.props.price}/>
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
            <Slider
                value={this.state.time}
                onChange={setTime}
                valueLabelDisplay="auto"
                aria-labelledby="time-slider"
                min={0}
                max={24}
                valueLabelFormat={timeValueLabelFormat}
            />
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
                        value: 0,
                        label: "$0",
                    },
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

class FoodOptions extends React.Component {
    render() {
        return(
             <div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '35%', marginTop: '13%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="sushi_id" icon={<img src={iconPrefMap.sushi} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.sushi} className='checked-img'/>}/>} label="Japanese&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="italian_id" icon={<img src={iconPrefMap.italian} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.italian} className='checked-img'/>}/>} label="Italian&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="indian_id" icon={<img src={iconPrefMap.indian} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.indian} className='checked-img'/>}/>} label="Indian"/> </ThemeProvider>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '35%', marginTop: '17%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="pizza_id" icon={<img src={iconPrefMap.pizza} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.pizza} className='checked-img'/>}/>} label="Pizza&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="falafel_id" icon={<img src={iconPrefMap.falafel} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.falafel} className='checked-img'/>}/>} label="Mediterranean&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="thai_id" icon={<img src={iconPrefMap.thai} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.thai} className='checked-img'/>}/>} label="Thai"/> </ThemeProvider>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '35%', marginTop: '21%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="korean_id" icon={<img src={iconPrefMap.bulgogi} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.bulgogi} className='checked-img'/>}/>} label="Korean&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="mexican_id" icon={<img src={iconPrefMap.taco} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.taco} className='checked-img'/>}/>} label="Mexican&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="american_id" icon={<img src={iconPrefMap.american} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.american} className='checked-img'/>}/>} label="American"/> </ThemeProvider>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '35%', marginTop: '25%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="fastfood_id" icon={<img src={iconPrefMap.corn_dog} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.corn_dog} className='checked-img'/>}/>} label="Fast food&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="icecream_id" icon={<img src={iconPrefMap.ice_cream} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.ice_cream} className='checked-img'/>}/>} label="Dessert&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="vegan_id" icon={<img src={iconPrefMap.vegan} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.vegan} className='checked-img'/>}/>} label="Vegan"/> </ThemeProvider>
                </div>
            </div>
        );
    }
}

class DrinkOptions extends React.Component {
    render() {
        return(
            <div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '35%', marginTop: '33%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="coffee_id" icon={<img src={iconPrefMap.coffee} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.coffee} className='checked-img'/>}/>} label="Coffee&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="juice_id" icon={<img src={iconPrefMap.juice} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.juice} className='checked-img'/>}/>} label="Juice/Smoothies"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="boba_id" icon={<img src={iconPrefMap.boba} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.boba} className='checked-img'/>}/>} label="Boba"/> </ThemeProvider>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '35%', marginTop: '37%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="beer_id" icon={<img src={iconPrefMap.beer} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.beer} className='checked-img'/>}/>} label="Bars&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                </div>
            </div>
        );
    }
}

class ActiveOptions extends React.Component {
    render() {
        return(
            <div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '70%', marginTop: '13%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="hiking_id" icon={<img src={iconPrefMap.hiking} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.hiking} className='checked-img'/>}/>} label="Hiking&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="kayak_id" icon={<img src={iconPrefMap.kayak} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.kayak} className='checked-img'/>}/>} label="Kayaking"/> </ThemeProvider>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '70%', marginTop: '17%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="boat_id" icon={<img src={iconPrefMap.boat} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.boat} className='checked-img'/>}/>} label="Boating&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="cyclingpaths_id" icon={<img src={iconPrefMap.bicycle} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.bicycle} className='checked-img'/>}/>} label="Cycling Paths"/> </ThemeProvider>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '70%', marginTop: '21%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="yoga_id" icon={<img src={iconPrefMap.yoga} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.yoga} className='checked-img'/>}/>} label="Yoga&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="climbing_id" icon={<img src={iconPrefMap.climbing} className='checkbox-img'/>} checkedIcon={<img src={iconPrefMap.climbing} className='checked-img'/>}/>} label="Climbing"/> </ThemeProvider>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);
