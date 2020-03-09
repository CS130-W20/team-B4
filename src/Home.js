import React, {Component} from 'react';
import './Home.css';
import Card from './Card';
import SearchBar from './SearchBar';
import Suggestion from './SuggestionSkeleton.js';
import TopBar from './TopBar.js';
import axios from 'axios';
import {db, storageRef} from './fireApi';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import yelpMap from './YelpAPIMap.js';
import Profile from './Profile.js';


export class userData{
    constructor(obj){
        this.username    = obj.username;
        this.first_name        = obj.first_name;
        this.last_name = obj.last_name;
        this.low         = obj.low;
        this.high        = obj.high;
        this.start_time  = obj.start_time;
        this.end_time    = obj.end_time;
        this.dist        = obj.dist;
        this.pic         = obj.pic;
        this.quote       = obj.quote;
        this.preferences = obj.preferences;
        this.promise     = null;
        this.email = obj.email ?? null;
    }

}
const _default = {username: '',
                 first_name: 'John',
                 last_name: "Doe",
                 low: 0,
                 high:0,
                 start_time: '',
                 end_time:'',
                 dist: 0,
                 quote: '',
                 pic:'',
                 preferences: []
             }



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


/**
 *    [WIP] Each added user will receive a Card component to represent them in a session.
 */
export default class Home extends Component{


      constructor(props){
          super(props);
          this.state={
              showSearch: false,
              all: [],
              display: {},
              filter: '',
              searchVal: '',
              showSearch: false,
              searchFocus: false,
              queryResult: null,
              categories: {}, // maps activity to number of people who want it
              showSuggestion: false, // if true, a query has been made
              showProfile: false
          }
      }

    /** Queries businesses around UCLA that match the specified category
     *
     *  @param categories array of places (strings) to include in filter
     *                    note: ["hiking","chinese"] => hiking OR chinese
     *  @return promise for yelp API call
     */
    getLocation = categories => {
      // Convert our category labels to those used by Yelp
      var yelpCategories = [];
      categories.forEach((category) => {yelpCategories = yelpCategories.concat(yelpMap[`${category}`])})
      console.log(yelpCategories);

      // Convert to REST API format (comma deliniated list)
      var categoryString = "";
      if(yelpCategories.length != 0) {
        yelpCategories.forEach((x) => {categoryString += x + ","});
        categoryString = categoryString.substring(0, categoryString.length-1);
      }
      return axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`, {
        headers: {
          Authorization: `Bearer XyLNjPiVmPm-_-Og2rpIVSqVUNbsAihqwf21PVcmpbmhQow8HEAflaDDLiO8rT6SmehRVMyJNLz-OqjyiwXCqy45-EIE7yVttnY9440F04drNBm_ceiBgnsVUWNEXnYx`,
          'X-Requested-With': `XMLHttpRequest`,
        },
        params: {
          categories: `${categoryString}`,

          // UCLA's coordinates
          latitude: 34.0689,
          longitude: -118.4452,
        }
      });
    };


    getCategoryListFromMap = () => {
      var temp = this.updateFilters();
      var ret = [];
      for(var key in temp) {
        // If at least 2 people want an activity, include in search
        if(temp[key] >= 2)
          ret.push(key);
      }

      // If empty, everyone has separate preferences, so consider everything
      if(ret.length == 0) {
        for(var key in temp) {
            ret.push(key);
        }
      }
      console.log(ret);
      return ret;
    }

    handleCardDelete = (card) => {
        var s = this.state.display;
        s[card.username] = false;
        this.setState({display:s});
      // var newAll = this.state.all.filter(x => x.username !== card.username);
      // this.setState({all: newAll});
    }

    handleSearchBar = (e) => {
        if(e.key === 'Escape'){
            this.setState({
                showSearch: false,
                searchVal: ''
            })

        }
        if("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".includes(e.key) &&
           !this.state.showSearch && this.state.searchVal === ''){
            this.setState({
                showSearch: true,
            })
        }

    }

    addCard = (user)=>{
        var s = this.state.display;
        s[user.username]=true;
        this.setState({display:s});

    }

    targetHasClickHandler = (event) => {
        let el = event.target;
        while(el) {
        if (el.getAttribute('data-click-handler')) {
           return true;
         }
         el = el.parentElement;
       }
       return false;
     }

    componentWillMount(){
        db.collection("users").get().then((querySnapshot) => {
                var l = [];
                querySnapshot.forEach((doc)=>{
                    console.log(doc.data());
                    l.push(new userData(doc.data()))});
                // this.setState({all: l})
                return l;
            }).then((users)=>{
              users.forEach((user)=>{
                    if(user.pic)
                        user.promise = this.getURL(user.pic)
                });
                this.setState({all:users});
                var s = {};
                this.state.all.forEach((user)=> {s[user.username]=false});
                this.setState({display:s});
            })

        // var l = [];
        // this.state.all.forEach((user)=>{user.promise = this.getURL(user.pic); l.push(user)})
        // this.setState({all:l})
        document.addEventListener('keydown', this.handleSearchBar);

    }

    searchChange = (e) =>{
        this.setState({searchVal: e.target.value})
        // if(e.target.value===''){
        //     this.setState({
        //         showSearch:false
        //     })
        // }
    }
    getURL = (p) => storageRef.child(p).getDownloadURL();

    /**
     *  @param u user data for newly selected user
     */
    updateFilters = () => {
      var temp = {};
        this.state.all.forEach((u)=>{
                    if(this.state.display[u.username]) {
                        u.preferences.forEach((pref) => {
                          if(temp[`${pref}`] == undefined) {
                            temp[`${pref}`] = 1;
                          }
                          else {
                            temp[`${pref}`]++;
                          }
                        });
                    }});
      return temp;
    }

    genCards = ()=>{
        var l = [];
        this.state.all.forEach((u)=>{
            if(this.state.display[u.username]) {
                l.push(<Card key={u.username}  data={u} imgURL = {u.pic ? this.getURL(u.pic) : ''} deleteCard = {this.handleCardDelete}/>);
            }});
            return l;
    }

    makeQuery = () => {
      var list = this.getCategoryListFromMap();
      console.log(list);
      this.getLocation(this.getCategoryListFromMap()).then((response) =>{
          console.log(response.data);
        this.setState({
          queryResult:response.data.businesses[0]
        })
        }
      ).catch(function (response) {
        console.log(response);
      });
    }

    toMainSession = () => {
      this.setState({
        showProfile: false,
        showSuggestion: false,
      })
    }

    render(){
        return(
          <div style={{height:'100%'}}>
          {!this.state.showProfile ?
          <div>
            {!this.state.showSuggestion ?
                <div>
                  <div> <TopBar toProfile={()=>{this.setState({showProfile: true})}} toMainSession={()=> {this.toMainSession()}}/> </div>
                  <div className="flex justify-center" style={{paddingTop: 60}}>
                      {this.genCards()}
                  </div>
                  <div style={{marginTop: '5%', left: '45%', position: 'absolute'}} className="justify-center">
                      <ThemeProvider theme={theme}>
                          <div style={{display: 'flex', 'flex-direction': 'column'}}>
                              <Button data-click-handler="true" variant={"contained"} onClick={()=>{this.handleSearchBar({key:''})}} theme={theme} color={"primary"} style={style}> <div style={{color: "grey"}}>  + Add Person </div> </Button>
                              <div style={{paddingTop: '20px'}}><Button variant={"contained"} onClick={()=>{this.setState({showSuggestion: true}); console.log(this.state.all); this.makeQuery()}} theme={theme} color={"secondary"} style={style}> Find Me a Place! </Button></div>
                          </div>
                      </ThemeProvider>
                  </div>
                  <div  onClick={(e)=>{
                      if (this.targetHasClickHandler(e))
                        this.handleSearchBar({key:''});
                      else
                        this.handleSearchBar({key:'Escape'});
                  }}>
                      <SearchBar addCard={this.addCard} display={this.state.display} userData={this.state.all} inputRef={this.inputRef} searchFocus={this.state.searchFocus} searchChange={this.searchChange} showSearch = {this.state.showSearch} searchVal ={this.state.searchVal}/>
                  </div>
              </div>
            :<Suggestion data={this.state.queryResult} goBack={() =>{this.setState({showSuggestion: false})}} toProfile={()=>{this.setState({showProfile: true})}} toMainSession={()=> {this.toMainSession()}}/>}
          </div>
          : <Profile toProfile={()=>{this.setState({showProfile: true})}} toMainSession={()=> {this.toMainSession()}} />}  {/* the toProfile prop is only here bc we're replacing routing with embedding */}
          </div>
        );
    }


}
