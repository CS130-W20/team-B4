import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import './Profile.css';
import { fireAuth } from "./fireApi";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import TopBar from './TopBar.js';

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
import maged from './img/maged.png';
import edit from './img/edit.png';
import logout from './img/arrow_white.png';
import dots from './img/dots.png';
import blue_circle from './img/circle_blue.png';
import grey_circle from './img/circle_grey.png';

/*category icons */
import fork from './img/fork2.png';

/* activity icons */
/* food icons */
import italian from './img/italian.png';
import sushi from './img/japanese.png';
import chinese from './img/chinese.png';
import pizza from './img/pizza.png';
import falafel from './img/falafel.png';
import taco from './img/taco.png';
import bulgogi from './img/bulgogi.png';
import corn_dog from './img/corn-dog.png';
import ice_cream from './img/ice-cream.png';


/* drink icons */
import boba from './img/boba.png';
import coffee from './img/coffee-cup2.png';

/* outdoors icons */
import bicycle from './img/bicycle.png';
import beach from './img/beach.png';
import kayak from './img/kayak.png';
import hiking from './img/mountain.png';

/* misc activity icons */
import museum from './img/museum.png';

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
            logged_in: props.location.state ? props.location.state.logged_in : false,
            edit: props.location.state ? props.location.state.edit : false,
            view: true,
            edit_pg1: true,
            name: "Maged Elaasar",
            username: "@maged_elaasar",
            blurb: "The first and third days after weekends are the hardest.",
            my_prefs: ['boba', 'coffee', 'cycling', 'museum', 'beach', 'japanese', 'kayak', 'chinese', 'hiking'],
            my_pref_map: {
                'italian': false,
                'japanese': true,
                'chinese': true,
                'boba': true,
                'coffee': true,
                'cycling': true,
                'beach': true,
                'kayak': true,
                'hiking': true,
                'museum': true
            },
            pref_map: {
                'boba': boba,
                'italian': italian,
                'coffee': coffee,
                'cycling': bicycle,
                'museum': museum,
                'beach': beach,
                'japanese': sushi,
                'kayak': kayak,
                'chinese': chinese,
                'hiking': hiking
            },
            my_pref_map: [],
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

    render() {
        const self = this;
        return (
            <div>
            <div> <TopBar/> </div>
            {this.state.view ?
            <div>
                <div style={{marginLeft: '1%', marginTop: '4.5%', position: 'absolute'}} onClick={()=>{this.setState({'view': false})}}> <img src={edit} className='edit-img'/> </div>
                <div style={{marginLeft: '10%', position: 'absolute'}}> <LeftSide price={this.state.price} time={this.state.time} distance={this.state.distance}/> </div>
                <div style={{marginLeft: '48%', marginTop: '10%', position: 'absolute'}} className='fullname-display'> {this.state.name} </div>
                <div style={{marginLeft: '48%', marginTop: '14%', position: 'absolute'}} className='username-display'> {this.state.username} </div>
                <div style={{marginLeft: '48%', marginTop: '17%', position: 'absolute'}} className='blurb-display'> {this.state.blurb} </div>
                <div style={{marginLeft: '48%', marginTop: '21%'}} className='username-display2'> {this.state.username} is down for... </div>
                <div style={{marginLeft: '48%', marginTop: '24%', position: 'absolute'}}> <RightSide my_prefs={this.state.my_prefs} pref_map={this.state.my_pref_map}/> </div>
            </div>
            :
            <div>
            <div style={{marginTop: '42%', marginLeft: '45%', position: 'absolute'}} className="justify-center"> <ThemeProvider theme={theme}> <Button variant={"contained"} onClick={()=>{this.setState({'view': true})}} theme={theme} color={"secondary"} style={style}> Save </Button> </ThemeProvider> </div>
            <div style={{marginTop: '45%', marginLeft: '46.5%', fontSize:15, textDecoration:'underline', position: 'absolute'}} className="message ph4 mt2" onClick={()=>{this.setState({view: 'true'})}}> cancel </div>
            <div>
                <div style={{marginLeft: '45%', marginTop: '5.5%', position: 'absolute'}} className='title-display'> Edit Preferences </div> 
                <form>
                <div style={{marginLeft: '2.5%', position: 'absolute'}}> <EditLeftSide price={this.state.price} time={this.state.time} distance={this.state.distance}/> </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '34.75%', marginTop: '10%', position: 'absolute'}}>
                <img src={fork} className='category-img'/> 
                {/*<div style={{marginLeft: '40%', marginTop: '25%', position: 'absolute'}} className='category-display'> Food </div>*/}
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '35%', marginTop: '13%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="sushi_id" icon={<img src={sushi} className='checkbox-img'/>} checkedIcon={<img src={sushi} className='checked-img'/>}/>} label="Japanese&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider> 
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="italian_id" icon={<img src={italian} className='checkbox-img'/>} checkedIcon={<img src={italian} className='checked-img'/>}/>} label="Italian"/> </ThemeProvider>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '35%', marginTop: '17%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="pizza_id" icon={<img src={pizza} className='checkbox-img'/>} checkedIcon={<img src={pizza} className='checked-img'/>}/>} label="Pizza&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="falafel_id" icon={<img src={falafel} className='checkbox-img'/>} checkedIcon={<img src={falafel} className='checked-img'/>}/>} label="Mediterranean"/> </ThemeProvider>
                </div>
                <div className="topnav full-width-div">
                    <div style={{float: 'right', marginRight: '2%', marginTop: '1%'}} onClick={() => fireAuth.signOut()}> <img src={logout} className='logout-img'/> </div>
                    <div style={{float: 'right', marginRight: '2%', marginTop: '0.25%'}}> <img src={maged} className="thumbnail-img"/> </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '35%', marginTop: '21%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="korean_id" icon={<img src={bulgogi} className='checkbox-img'/>} checkedIcon={<img src={bulgogi} className='checked-img'/>}/>} label="Korean&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="mexican_id" icon={<img src={taco} className='checkbox-img'/>} checkedIcon={<img src={taco} className='checked-img'/>}/>} label="Mexican"/> </ThemeProvider>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}} style={{marginLeft: '35%', marginTop: '25%', position: 'absolute'}}>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="fastfood_id" icon={<img src={corn_dog} className='checkbox-img'/>} checkedIcon={<img src={corn_dog} className='checked-img'/>}/>} label="Fast food&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/> </ThemeProvider>
                <ThemeProvider theme={theme}> <FormControlLabel control={<Checkbox id="icecream_id" icon={<img src={ice_cream} className='checkbox-img'/>} checkedIcon={<img src={ice_cream} className='checked-img'/>}/>} label="Dessert"/> </ThemeProvider>
                </div>
                <div>
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
                </div>
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
                <div style={{marginTop: '30px', marginLeft: '50px',position: 'absolute'}}> <img src={maged} className="profile-img"/> </div>
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
        const name = "Maged Elaasar";
        const username = "@maged_elaasar";
        const blurb = "The first and third days after weekends are the hardest.";
        const my_prefs = this.props.my_prefs;
        const pref_map = this.props.pref_map;
        const manyPrefs = (my_prefs.length > 8);
        return (
            <div>
                <div className='row'> {
                    pref_map.slice(0,4).map( ({word, pic}) => { return <div key={pic} style={{marginRight: '65px'}}> {<img src={pic} className="activity-img"/>} <div className="label"> {word} </div> </div> })
                } </div>
                <div>
                    { manyPrefs ? (
                    <div style={{marginTop: '65px'}} className='row'>
                    {pref_map.slice(4,7).map( ({word, pic}) => { return <div key={pic} style={{marginRight: '65px'}}> {<img src={pic} className="activity-img"/>} <div className="label"> {word} </div> </div> })}
                    <Popup trigger={<img src={dots} className="dots"/>} position="right center">
                        <div> {pref_map.slice(7,pref_map.length).map( ({word, pic} ) => {return <div key={pic} className="tag-popup"> {word} </div>})} </div>
                    </Popup>
                    </div> ) : (
                    <div style={{marginTop: '65px'}} className='row'>
                    {pref_map.slice(4,8).map( ({word, pic}) => { return <div key={pic} style={{marginRight: '65px'}}> {<img src={pic} className="activity-img"/>} <div className="label"> {word} </div> </div> })}
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
                <div style={{marginTop: '30px', marginLeft: '50px',position: 'absolute'}}> <img src={maged} className="profile-img"/> </div>
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

export default withRouter(Profile);
