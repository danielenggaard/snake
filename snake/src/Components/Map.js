import React, { Component } from 'react';
import { get } from "../Util/web";
import { states, hubPath } from "../Constants/constants";
import * as signalR from '@microsoft/signalr';

export default class Map extends Component {

    constructor(props) {
        super(props);

        this.setBoard();

        this.state = {
            map: []
        }
    }

    bindMethods() {
        this.beginCountdown = this.beginCountdown.bind(this);
    }

    componentDidMount() {
        this.setBoard();
        this.initNegotiation();
    }

    createArea(row, column) {
        return {
            row,
            column,
            state: states.UNVISITED
        }
    }

    initBoard() {
        const { rows, columns } = this.state;
        const map = [];
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                map[row][column] = this.createArea(row, column);
            }
        }
        this.setState({ map, mapDidInit: true });
    }

    async initNegotiation() {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubPath)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.setState({ connection }, () => {
            connection.on('beginCountDown', countDown => this.beginCountdown(countDown));
            connection.on('updateSnake', obj => this.updateSnakePosition(obj));
            connection.start()
            .then(_ => {
                console.log("Connection established.");
                connection.invoke('BeginCountDown');
            })
            .catch(err => console.log("Establishing connection to server failed."));
        });
    }

    beginCountdown(milliseconds) {

        // this.setState({ countdownIsOn: true }, () => {
        //     for (let i = milliseconds / 1_000; i >= 0; i--) {
        //         this.setState({ currentCountDown:  i});
        //         setTimeout(() => {}, 1_000);
        //     }
        // })
        console.warn("Beginning countdown on 1 second. Todo: implement");
        setTimeout(_ => { console.log("Countdown done.") }, 1000);
        this.state.connection.invoke('StartGame').catch(e => console.log("Error during starting game: ", e));
    }

    setBoard = async _ => await get("init", obj => 
        this.setState({ rows: obj.rows, columns: obj.columns }, () => this.initBoard ));
        
    

    updateSnakePosition(newPositions, erasedPositions) {

    }

    render() {
        
        return <React.Fragment>
            
        
        </React.Fragment>
    }
}
