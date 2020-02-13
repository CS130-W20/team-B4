import React, {Component} from 'react';
import './Profile.css';
import { fireAuth } from "./fireApi";
import Button from "@material-ui/core/Button";
import clock from './img/clock.png';
import road from './img/road.png';
import price from './img/price.png';
import maged from './img/maged.png';

export default class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            logged_in: false,
            name: "Maged Elaasar",
            username: "@maged_elaasar",
            blurb: "The first and third days after weekends are the hardest.",
            time_pref: "7PM - 9PM",
            distance_pref: "<30 mi",
            price_pref: "$30 - $60",
        }
    }

    render() {
        const self = this;
        return (
            <div>
                <div> <Topbar/> </div>
                <div style={{marginLeft: '700px'}}> <Text name={this.state.name} username={this.state.username} blurb={this.state.blurb}/> </div>
                <div style={{marginLeft: '140px', position: 'absolute'}}> <LeftSide/> </div>  
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
                <div className="username-display"> {this.props.username} </div>
                <div className="blurb-display"> {this.props.blurb} </div>
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

class LogisticalPreferences extends React.Component {
    render() {
        return (
            <div style={{marginTop: '30px'}}>
                <img src={clock} className="logistical-icon-img"/>
                <div style={{marginRight: '20px'}} className="logistical-pref-display"> {this.props.time_pref} 7PM - 9PM </div>
                <img src={road} className="logistical-icon-img"/>
                <div style={{marginRight: '20px'}} className="logistical-pref-display"> {this.props.distance_pref} {'<'} 30 mi </div>
                <img src={price} className="logistical-icon-img"/>
                <div className="logistical-pref-display"> {this.props.price_pref} $30 - $60 </div>
            </div>
        );
    }
}
