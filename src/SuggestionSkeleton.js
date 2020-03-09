import React, { Component } from 'react';
import thai from "./img/thailand.png";
import GMap from './GMap.js';
import fourStars from "./img/yelp_stars/extra_large_4.png";
import TopBar from './TopBar';
import yelpLogo from "./img/Yelp_Logo.png";
import "./Suggestion.css";
import edit from './img/edit.png';
import background from './img/freeimg3.jpg';
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider, withStyles, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2962ff',
        },
    },
    overrides: {
        MuiButton: {
            label: {
                color: '#ffffff',
		fontFamily: 'Raleway',
            },
        },
    }
});

const style = {
    textTransform: 'none',
    borderRadius: '25px',
    width: '240px',
};

export default class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <TopBar toProfile={()=>{this.props.toProfile()}} toMainSession={()=>{this.props.toMainSession()}}/>
                <div style={{height:'50%'}} className="flex flex-row">
                    <div style={{width:'35%'}}>hi</div>
                    <div style={{zIndex:1, borderLeft:'2px solid black', width:'65%'}}><GMap/></div>
                    <div className="result">
                        <div className="title"> Emporium Thai </div>

                     </div>
                    {/*<div className="box-suggestion pa4 pt1">
                        <div style={{ marginLeft: '1%', marginTop: '4.5%', position: 'absolute' }}
                            onClick={() => { this.setState({ 'view': false }) }}> <img src={edit} className='edit-img' />
                        </div>
                        <div className="justify-center" style={{ paddingTop: 30 }}>
                            <img className="suggestion-image" src={thai} alt="" width="260" height="260" style={{borderStyle: "solid", borderRadius: "25px"}}/>
                        </div>
                        <div className="suggestion-name">{this.props.name}</div>
                        <div className="flex justify-center" style={{ alignItems: "center" }}>
                            <div className="yelp-box pa3 pt3">
                                <img src={fourStars} alt="star rating"></img>
                                <div className="flex justify-center" style={{alignItems: "center", paddingTop: 5}}>
                                    <img src={yelpLogo} alt="yelp" style={{width: "40%", paddingLeft: 10}}></img>
                                    <div style={{ fontFamily: "Raleway", fontSize: 20, color: "white"}}>106 reviews</div>
                                </div>
                            </div>
                            <div style={{ fontWeight: "bold", fontFamily: "Raleway", fontSize: 35, color: "rgb(125, 71, 0)" }}>$$</div>
                            <div style={{ fontWeight: "bold", fontFamily: "Raleway", fontSize: 30, paddingLeft: 30,
                                color: "rgb(125, 71, 0)" }}>Thai Restaurant
                            </div>
                        </div>
                    </div>
    		<div style={{marginTop: '45%', marginLeft: '42%', position: 'absolute'}} className="justify-center"> <ThemeProvider theme={theme}> <Button variant={"contained"} theme={theme} color={"primary"} style={style}> Find me something else! </Button> </ThemeProvider> </div>
                    <img src={background} className="background"></img> */}
                    </div>
            </div>
        )
    }
}
