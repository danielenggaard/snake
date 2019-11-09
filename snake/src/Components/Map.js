import React, { Component } from 'react';
import { get } from "../Util/web";
import { states, hubPath, className } from "../Constants/constants";
import * as signalR from '@microsoft/signalr';
import "./squareStyles.css";
export default class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            map: [],
            rows: 30,
            columns: 30
        }
    }

    bindMethods() {
        this.beginCountdown = this.beginCountdown.bind(this);
    }

    componentDidMount() {
        this.setBoard();
        this.initNegotiation();
        this.initBoard();
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
            map[row] = [];
            for (let column = 0; column < columns; column++)
                map[row][column] = this.createArea(row, column);
            
        }
        this.setState({ map, mapDidInit: true });
    }

    renderColumn(row) {
        const { map } = this.state;
        const columns = [];

        map[row].forEach(square => {
            columns.push(
                <td style={{ 
                    border: "1px solid black", 
                }} 
                className={className[square.state]}
                key={`${row}_${square.column}`}></td>
            )
        });

        return columns;
    }

    renderRows() {
        const { map } = this.state;
        const grid = [];
        map.forEach((row, i) => {
            grid[i] = 
            <tr key={i}>
                {this.renderColumn(i)}
            </tr>
        })
        return grid;
    }

    setConnectionListeners(connection) {
        connection.on('beginCountDown', countDown => this.beginCountdown(countDown));
        connection.on('updateSnake', e => this.updateSnakePosition(e));
        connection.start()
            .then(_ => {
                console.log("Connection established.");
                // connection.invoke('BeginCountDown');
            })
            .catch(err => console.log("Establishing connection to server failed."));
    }

    async initNegotiation() {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubPath)
            .build();

        this.setConnectionListeners(connection);
        this.setState({ connection, connectionDidInit: true });
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
        // this.state.connection.invoke('StartGame').catch(e => console.log("Error during starting game: ", e));
    }

    setBoard = async _ => await get("init", obj => 
        this.setState({ rows: obj.rows, columns: obj.columns }));
        
    

    updateSnakePosition(obj) {
        const { map, lastSquare } = this.state;
        const body = obj.snake;
        if (lastSquare)
            map[lastSquare.row][lastSquare.column].state = states.UNVISITED;

        body.forEach(body => {
            map[body.row][body.column].state = states.PATH;
        });
        this.setState({ map, lastSquare: body[body.length - 1] });
        
    }
    
    renderStartButton() {
        const { connection, connectionDidInit, mapDidInit } = this.state;
        if (connectionDidInit && mapDidInit)
            return <button onClick={() =>  connection.invoke('StartGame')}>Start</button>
        return <button>Start</button>
    }

    render() {

        
        return <React.Fragment>
            
            <table
            style={{
               width: '100%',
                height: '500px'
            }}>
            <tbody>
                {this.renderRows()}
            </tbody>
        </table>
        {this.renderStartButton()}

        </React.Fragment>
    }
}
