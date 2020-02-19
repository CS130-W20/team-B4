import React, {Component} from 'react';
import './Home.css';
import Card from './Card';

export default class Home extends Component{
    render(){
        return(
            <div className="flex justify-center">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            HI THIS IS HOME
            </div>
        );
    }


}
