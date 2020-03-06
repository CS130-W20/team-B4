import React, { Component } from 'react';
import thai from "./img/thailand.png";
import fourStars from "./img/yelp_stars/extra_large_4.png";
import TopBar from './TopBar';
import yelpLogo from "./img/Yelp_Logo.png";
import "./Suggestion.css";
import edit from './img/edit.png';
import background from './img/freeimg3.jpg';

export default class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (

            <div className="parent">
                <div><TopBar /></div>
                <div className="box-suggestion pa4 pt1">
                    <div style={{ marginLeft: '1%', marginTop: '4.5%', position: 'absolute' }}
                        onClick={() => { this.setState({ 'view': false }) }}> <img src={edit} className='edit-img' />
                    </div>
                    <div className="justify-center" style={{ paddingTop: 20 }}>
                        <img className="suggestion-image" src={thai} alt="" width="260" height="260" />
                        {/*TODO: change image to match desired location*/}
                    </div>
                    <div className="suggestion-name">Emporium Thai</div>
                    {/*TODO: make this text field match the desired location name"*/}
                    <div className="flex justify-center" style={{ alignItems: "center" }}>
                        <div className="yelp-box pa3 pt3">
                        {/*TODO: make yelp box a button that links to Yelp, modify contents of box to be accurate*/}
                            <img src={fourStars} alt="star rating"></img>
                            <div className="flex justify-center" style={{alignItems: "center", paddingTop: 5}}>
                                <img src={yelpLogo} alt="yelp" style={{width: "40%", paddingLeft: 10}}></img>
                                <div style={{ fontFamily: "Raleway", fontSize: 20, color: "white"}}>106 reviews</div>
                            </div>
                        </div>
                        <div style={{ fontWeight: "bold", fontFamily: "Raleway", fontSize: 35 }}>$$</div>
                        {/*TODO: num dollar signs should match destination price*/}
                        <div style={{ fontWeight: "bold", fontFamily: "Raleway", fontSize: 30, paddingLeft: 30 }}>Thai Restaurant</div>
                    </div>
                </div>
                <img src={background} className="background"></img>
            </div>
        )
    }
}