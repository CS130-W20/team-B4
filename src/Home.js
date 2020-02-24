import React, {Component} from 'react';
import './Home.css';
import Card from './Card';

import axios from 'axios';


/**
 *    [WIP] Each added user will receive a Card component to represent them in a session.
 */
export default class Home extends Component{


    // TODO: remove hardcoded latitude and longitude, link to a button
    getLocation = inputLocation => {
      axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`, {
        headers: {
          Authorization: `Bearer XyLNjPiVmPm-_-Og2rpIVSqVUNbsAihqwf21PVcmpbmhQow8HEAflaDDLiO8rT6SmehRVMyJNLz-OqjyiwXCqy45-EIE7yVttnY9440F04drNBm_ceiBgnsVUWNEXnYx`,
          'X-Requested-With': `XMLHttpRequest`,
        },
        params: {
          total: 1,
          latitude: 37.786882,
          longitude: -122.399972,
        }
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log ('error')
      })
      console.log(inputLocation);
    };

    render(){
        return(
            <div className="flex justify-center">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            </div>
        );
    }


}
