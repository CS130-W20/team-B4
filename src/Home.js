import React, {Component} from 'react';
import './Home.css';
import Card from './Card';
import SearchBar from './SearchBar';
import axios from 'axios';
import {db} from './fireApi';


/**
 *    [WIP] Each added user will receive a Card component to represent them in a session.
 */
export default class Home extends Component{

    // Queries businesses around UCLA that match the specified category
    getLocation = category => {
      return axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`, {
        headers: {
          Authorization: `Bearer XyLNjPiVmPm-_-Og2rpIVSqVUNbsAihqwf21PVcmpbmhQow8HEAflaDDLiO8rT6SmehRVMyJNLz-OqjyiwXCqy45-EIE7yVttnY9440F04drNBm_ceiBgnsVUWNEXnYx`,
          'X-Requested-With': `XMLHttpRequest`,
        },
        params: {
          categories: `${category}`,

          // UCLA's coordinates
          latitude: 34.0689,
          longitude: -118.4452,
        }
      });
    };

    constructor(props){
        super(props);
        this.state={
            showSearch: false,
            usernames: [],
            filter: '',
            searchVal: '',
            showSearch: false,
            searchFocus: false,
            queryResult: null
        }
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

    componentWillMount(){
        db.collection("users").get().then((querySnapshot) => {
                var l = [];
                querySnapshot.forEach((doc)=>{
                    l.push(doc.data().username)});
                this.setState({usernames: l})
            });
        document.addEventListener('keydown', this.handleSearchBar);

    }

    searchChange = (e) =>{
        this.setState({searchVal: e.target.value})
        if(e.target.value===''){
            this.setState({
                showSearch:false
            })
        }
    }
    render(){
        console.log(this.state.usernames);

        // Sets state to first search result for default value "hiking"
        // Note it takes a few seconds to fetch this, but will fetch -> load new
        //    screen when displaying result
        this.getLocation("hiking").then((response) =>
          this.setState({
            queryResult:response.data.businesses[0].name
          })
        ).catch(function (response) {
          console.log(response);
        });
      console.log("query result: " + this.state.queryResult);
        return(
            <div >
                <div className="flex var yvar justify-center">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                <SearchBar inputRef={this.inputRef} searchFocus={this.state.searchFocus} searchChange={this.searchChange} showSearch = {this.state.showSearch} searchVal ={this.state.searchVal}/>
            </div>
        );
    }


}
