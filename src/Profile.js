import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import './Profile.css';
import { fireAuth } from "./fireApi";
import Button from "@material-ui/core/Button";
import clock from './img/clock.png';
import road from './img/road.png';
import price from './img/price.png';
import maged from './img/maged.png';
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

export default class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            logged_in: false,
            name: "Maged Elaasar",
            username: "@maged_elaasar",
            blurb: "The first and third days after weekends are the hardest.",
            activity_prefs: ["boba", "italian", "coffee"],
        }
    }

    render() {
        const self = this;
        return (
            <div>
                <div> <Topbar/> </div>
                <div style={{marginLeft: '140px', position: 'absolute'}}> <LeftSide/> </div>  
                <div style={{marginLeft: '700px', position: 'absolute'}}> <RightSide/> </div>
            </div>
        );
    }
}

class Topbar extends Component {
    render() { 
        return (
            <div>
                <div className="topnav full-width-div">
                    <div style={{float: 'right', margin: '10px'}}> <Button variant={"contained"} onClick={() => fireAuth.signOut()}> Log out </Button> </div>
                    <div style={{float: 'right'}}> <img src={maged} className="thumbnail-img"/> </div>
                </div>
            </div>
        );
    }
}

class Text extends React.Component {
    render() {
        return (
            <div>
                <div className="fullname-display"> {this.props.name} </div>
                <div style={{marginTop: '65px'}} className="username-display"> {this.props.username} </div>
                <div style={{marginTop: '100px'}} className="blurb-display"> {this.props.blurb} </div>
            </div>
        );
    }
}

class LeftSide extends Component {
    render() {
        return (
            <div>
                <div style={{marginTop: '150px', marginLeft: '90px'}}> <img src={maged} className="profile-img"/> </div>
                <div> <LogisticalPreferences/> </div>
            </div>
        );
    }
}

class RightSide extends Component {
    render() {
        const name = "Maged Elaasar";
        const username = "@maged_elaasar";
        const blurb = "The first and third days after weekends are the hardest.";
        return (
            <div style={{marginTop: '150px'}}>
                <div> <Text name={name} username={username} blurb={blurb}/> </div>
                <div style={{marginTop: '150px', position: 'absolute'}}> <ActivityPreferences/> </div>
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
            <div style={{marginTop: '30px', marginLeft: '60px'}}>
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

class ActivityPreferences extends Component {
    render() {
        const my_prefs = ['boba'];
        const pref_map = [
            {word: 'boba', pic: boba},
            {word: 'italian', pic: italian},
            {word: 'coffee', pic: coffee},
            {word: 'cycling', pic: bicycle},
            {word: 'museum', pic: museum},
            {word: 'beach', pic: beach},
            {word: 'japanese', pic: sushi},
            {word: 'kayak', pic: kayak},
            {word: 'chinese', pic: chinese} 
        ];
        const email_map = [{name: 'Sam', email: 'somehwere@gmail.com'}, {name: 'Ash', email: 'someting@gmail.com'}]; 
        const manyPrefs = true;
        return (
            <div>
                <div style={{marginTop: '20px'}} className='row'> {
                    pref_map.slice(0,4).map( ({word, pic}) => { return <div key={pic} style={{marginRight: '65px'}}> {<img src={pic} className="activity-img"/>} <div className="drink"> {word} </div> </div> }) 
                } </div>
                <div>
                    { manyPrefs ? (
                    <div style={{marginTop: '35px'}} className='row'>
                    {pref_map.slice(4,7).map( ({word, pic}) => { return <div key={pic} style={{marginRight: '42px'}}> {<img src={pic} className="activity-img"/>} <div className="drink"> {word} </div> </div> })} 
                    <Popup trigger={<img src={dots} className="dots"/>} position="right center">
                        <div> {pref_map.slice(7,pref_map.length).map( ({word, pic} ) => {return <div key={pic} className="tag-popup"> {word} </div>})} </div>
                    </Popup>
                    </div> ) : (
                    <div style={{marginTop: '35px'}} className='row'>
                    {pref_map.slice(4,8).map( ({word, pic}) => { return <div key={pic} style={{marginRight: '35px'}}> {<img src={pic} className="activity-img"/>} <div className="drink"> {word} </div> </div> })} 
                    </div>)}
                </div>
            </div>
        );
    }
}

