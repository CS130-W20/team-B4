import React, {Component} from 'react';
import './Home.css';
import Card from './Card';
import SearchBar from './SearchBar';

import axios from 'axios';


/**
 *    [WIP] Each added user will receive a Card component to represent them in a session.
 */
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            showSearch: false,
            posts:[],
            filter: '',
            searchVal: '',
            showSearch: false,
            searchFocus: false
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
        return(
            <div>
                <div className="flex justify-center">
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
