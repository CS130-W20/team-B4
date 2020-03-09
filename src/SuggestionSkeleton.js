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
import {Fade, Zoom} from 'react-reveal';
import { createMuiTheme, ThemeProvider, withStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import { IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import axios from 'axios';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2962ff',
        },
        secondary:{
            main:'#FFF',
        }
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


const star_style={
    width:30,
    height:30,
    paddingRight: 5
}
const half_star_style={
    width:15,
    height:30,
    paddingRight: 5
}
class Rating extends Component{
    genStars = ()=>{
        let l = []
        let r = this.props.rating;
        console.log(r);
        for(let i = 1; i <= this.props.rating; i++){
            l.push(<img style={star_style} src={'/image/star.png'}/>)
            r -= 1
        }
        console.log(r);
        if(r!=0){
            l.push(<img style={half_star_style} src={'/image/half_star.png'}/>);
        }
        return l
    }
    render(){
        return(
            <div className="flex flex-row mb2" >
                {this.genStars()}
            </div>
        )
    }
}

export default class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            queryCounter: 0,
            businessIsClosed: null, // separate bc need to make a separate query call
        }
    }

    getExtraLocationData = id => {
      return axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${id}`, {
        headers: {
          Authorization: `Bearer XyLNjPiVmPm-_-Og2rpIVSqVUNbsAihqwf21PVcmpbmhQow8HEAflaDDLiO8rT6SmehRVMyJNLz-OqjyiwXCqy45-EIE7yVttnY9440F04drNBm_ceiBgnsVUWNEXnYx`,
          'X-Requested-With': `XMLHttpRequest`,
        }
      });
    };

    checkIsOpen = () => {
      var id = this.props.data[this.state.queryCounter].id;
      this.getExtraLocationData(id).then((response) => {
        this.setState({
          businessIsClosed: response.data.is_closed
        });
      });
    }

    render() {
        let data = this.props.data !== null ? this.props.data[this.state.queryCounter] : null;
        if(data !== null && this.state.businessIsClosed == null)
          this.checkIsOpen();
        if(this.props.data && this.state.refreshing) {
          this.setState({refreshing: false});
        }
        let {refreshing} = this.state;
        return (
            <div>
                <TopBar toProfile={()=>{this.props.toProfile()}} toMainSession={()=>{this.props.toMainSession()}}/>
                <div style={{height:'50%'}} className="flex flex-row">
                    <div className="photo" style={{backgroundImage:`url(${data ? data.image_url : ""})`}}/>
                    <div style={{zIndex:1, borderLeft:'2px solid black', width:'65%'}}>
                        <GMap lat={data ? data.coordinates.latitude : 34.0671489} long = {data ? data.coordinates.longitude : -118.4506839}/></div>
                    <Fade bottom>
                        <div className="result">
                            {!this.props.data ? (
                              <CircularProgress
                                style={{ color: "#005DCB" }}
                                color={"inherit"}
                                size={16}
                              />
                          ) : (
                              <div>
                                <div id="title">{data.name}</div>
                                <Rating review_count={data.review_count} rating={data.rating}/>
                                <div className="flex flex-row">
                                    <div className="CategoryPrice">{data.price}</div>
                                    <div className="flex items-center"><div className="dot mh2"/></div>
                                    <div className="CategoryPrice"> {data.categories.map(a => a.title + ", ").slice(0,2).join(' ').slice(0,-2)}</div>
                                    <div className="flex items-center"><div className="dot mh2"/></div>
                                    <div className="CategoryPrice" style={{fontWeight:'bold', color: this.state.businessIsClosed ? `green` :'red'}}>{!this.state.businessIsClosed ? "closed" : "open"}</div>
                                </div>
                                <div className="divider"/>
                                <div className="CategoryPrice mb2">{data.location["address1"]}</div>
                                <div className="CategoryPrice">{data.display_phone}</div>
                              </div>
                            )}
                        </div>
                    </Fade>
                            <div className="refreshIcon">
                            <ThemeProvider theme={theme}>
                          <IconButton
                            type={"submit"}
                            variant={"contained"}
                            color={"secondary"}
                            onClick={()=>{this.setState({refreshing:true})}}
                          >
                            {refreshing ? (
                              <CircularProgress
                                style={{ color: "#FFF" }}
                                color={"inherit"}
                                size={24}
                              />
                          ) : <ArrowForwardIcon onClick={()=>{
                                      if(this.props.data !== null) {
                                        var newCount = this.state.queryCounter != this.props.data.length-1 ? this.state.queryCounter + 1 : 0;
                                        this.setState({queryCounter: newCount});
                                      }
                                    }
                                  } />
                            }
                          </IconButton>
                          </ThemeProvider>
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
