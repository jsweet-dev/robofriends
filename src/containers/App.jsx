import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary  from "../components/ErrorBoundary";

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => this.setState({robots: data}));
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
        //console.log(filteredRobots);
    }

    render() {
        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });

        return !robots.length ? 
            <h1>Loading...</h1> : 
            (
                <div className="tc">
                    <h1 className="tc">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }
}

export default App;