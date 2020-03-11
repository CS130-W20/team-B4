import React, { Component } from 'react';
import GMap from './GMap.js';
import TopBar from './TopBar';
import "./Suggestion.css";
import {Fade} from 'react-reveal';
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import { IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import firebase from 'firebase';


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
        for(let i = 1; i <= this.props.rating; i++){
            l.push(<img style={star_style} src={'/image/star.png'}/>)
            r -= 1
        }
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
      var businessInfo = firebase.functions().httpsCallable('businessInfo');
      return businessInfo({id:id});
    };

    checkIsOpen = () => {
      var id = this.props.data[this.state.queryCounter].id;
      this.getExtraLocationData(id).then((response) => {
        this.setState({
          businessIsClosed: response.data.is_closed
        });
    }).catch((err)=>{console.log(err)});
    }

    render() {
        let data = this.props.data !== null ? this.props.data[this.state.queryCounter] : null;
        if(data !== null && this.state.businessIsClosed === null)
          this.checkIsOpen();
        if(this.props.data && this.state.refreshing) {
          this.setState({refreshing: false});
        }
        let {refreshing} = this.state;
        return (
            <div>
                <TopBar toProfile={()=>{this.props.toProfile()}} toMainSession={()=>{this.props.toMainSession()}}/>
                <div style={{height:'50%'}} className="flex flex-row">
                    <Fade><div className="photo" style={{backgroundImage:`url(${data ? data.image_url : '/image/loadingImage.jpg'})`}}/></Fade>
                    <div style={{zIndex:1, borderLeft:'2px solid black', width:'65%'}}>
                        <GMap lat={data ? data.coordinates.latitude : 34.0671489} long = {data ? data.coordinates.longitude : -118.4506839}/></div>
                    <Fade bottom>
                        <div className="result">
                            {!this.props.data ? (
                              <CircularProgress
                                style={{ color: "#005DCB" }}
                                color={"inherit"}
                                size={30}
                              />
                          ) : (
                              <div>
                                <div id="title">{data.name}</div>
                                <Rating review_count={data.review_count} rating={data.rating}/>
                                <div className="CategoryPrice"> {data.categories.map(a => a.title + ", ").slice(0,2).join(' ').slice(0,-2)}</div>
                                <div className="flex flex-row mt2">
                                    <div className="CategoryPrice">{data.price}</div>
                                    {data.price ? <div className="flex items-center"><div className="dot mh2"/></div> : <div/>}
                                    {/*<div className="flex items-center"><div className="dot mh2"/></div>*/}
                                    <div className="CategoryPrice" style={{fontWeight:'bold', color: !this.state.businessIsClosed ? `green` :'red'}}>{this.state.businessIsClosed ? "closed" : "open"}</div>
                                </div>
                                <div className="divider"/>
                                <div className="info mb2">{data.location["address1"]}</div>
                                <div className="info" style={{paddingBottom:20}}>{data.display_phone}</div>
                                    <div className="refreshIcon">
                                    <ThemeProvider theme={theme}>
                                  <IconButton
                                    type={"submit"}
                                    variant={"contained"}
                                    color={"secondary"}
                                    onClick={()=>{
                                        if(this.props.data !== null) {
                                          var newCount = this.state.queryCounter != this.props.data.length-1 ? this.state.queryCounter + 1 : 0;
                                          this.setState({refreshing:true}, ()=>{
                                          this.setState({queryCounter: newCount, businessIsClosed: null},
                                      ()=>{this.setState({refreshing:false})})});}}}
                                  >
                                    {refreshing ? (
                                      <CircularProgress
                                        style={{ color: "#FFF" }}
                                        color={"inherit"}
                                        size={24}
                                      />
                                  ) : <ArrowForwardIcon/>
                                    }
                                  </IconButton>
                                  </ThemeProvider>
                                  </div>
                              </div>
                            )}
                        </div>
                    </Fade>
                    </div>
            </div>
        )
    }
}
