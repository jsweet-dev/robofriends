import React, { useEffect } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary  from "../components/ErrorBoundary";
import { setSearchField, setRobots } from "../actions";

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(setRobots())
    }
}

const App = (props) => {
    const {searchField, onSearchChange, robots, isPending, onRequestRobots} = props;

    useEffect(() => {
        onRequestRobots();
    }, [onRequestRobots])

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    
    return isPending ? 
        <h1>Loading...</h1> : 
        (
            <div className="tc">
                <h1 className="tc">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
