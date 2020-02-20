import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import './Profile.css';
import { fireAuth } from "./fireApi";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import clock from './img/clock.png';
import road from './img/road.png';
import price from './img/price.png';
import maged from './img/maged.png';
import edit from './img/edit.png';
import logout from './img/arrow_white.png';

import dots from './img/dots.png';

import boba from './img/boba.png';
import coffee from './img/coffee-cup2.png';
import italian from './img/italian.png';
import bicycle from './img/bicycle.png';
import sushi from './img/japanese.png';
import museum from './img/museum.png';
import beach from './img/beach.png';
import kayak from './img/kayak.png';
import chinese from './img/chinese.png';
import hiking from './img/mountain.png';

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
        }
    }
});

const style = {
    textTransform: 'none',
    borderRadius: '25px',
    width: '150px',
};

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            logged_in: props.location.state ? props.location.state.logged_in : false,
            edit: props.location.state ? props.location.state.edit : false,
            view: true, 
            name: "Maged Elaasar",
            username: "@maged_elaasar",
            blurb: "The first and third days after weekends are the hardest.",
            my_prefs: ['boba', 'coffee', 'cycling', 'museum', 'beach', 'japanese', 'kayak', 'chinese', 'hiking'],
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
            my_pref_map: []
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
            <div> <Topbar/> </div>
            {this.state.view ?
            <div>
                <div style={{marginLeft: '1%', marginTop: '4.5%', position: 'absolute'}} onClick={()=>{this.setState({'view': false})}}> <img src={edit} className='edit-img'/> </div>  
                <div style={{marginLeft: '10%', position: 'absolute'}}> <LeftSide/> </div>  
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
            </div>
            }
            </div>
        );
    }
}

class Topbar extends Component {
    render() { 
        return (
            <div>
                <div className="topnav full-width-div">
                    <div style={{float: 'right', marginRight: '2%', marginTop: '1%'}} onClick={() => fireAuth.signOut()}> <img src={logout} className='logout-img'/> </div>
                    <div style={{float: 'right', marginRight: '2%', marginTop: '0.25%'}}> <img src={maged} className="thumbnail-img"/> </div>
                </div>
            </div>
        );
    }
}

class LeftSide extends Component {
    render() {
        return (
            <div>
                <div style={{marginTop: '45%'}} className='gradient-box'>
                <div style={{marginTop: '30px', marginLeft: '50px', position: 'absolute'}}> <img src={maged} className="profile-img"/> </div>
                <div style={{marginTop: '200px', marginLeft: '70px', position: 'absolute'}}> <LogisticalPreferences/> </div>
                </div>
            </div>
        );
    }
}

class LogisticalPreferences extends React.Component {
    render() {
        const tp = "7PM - 9PM";
        const dp = "<30 mi";
        const pp = "$30 - $60";
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

export default withRouter(Profile);
