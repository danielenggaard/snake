import React, { Component } from 'react';
import { get } from "../Util/web";
import { states, hubPath, className } from "../Constants/constants";
import * as signalR from '@microsoft/signalr';
import "./squareStyles.css";
import Appbar from './AppBar';
import GridContiner from './GridContainer';
import { Typography, Box } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
export default class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            map: [],
            rows: 0,
            columns: 0,
            score: 0
        }
        this.bindMethods();
    }

    bindMethods() {
        this.beginCountdown = this.beginCountdown.bind(this);
        this.startGame = this.startGame.bind(this);
        this.onGameOver = this.onGameOver.bind(this);
    }

    componentDidMount() {
        this.setBoard();
        this.initNegotiation();
        document.addEventListener("keydown", this.changeDirection);
    }

    createArea(row, column) {
        return {
            row,
            column,
            state: states.UNVISITED
        }
    }

    updateScore = obj => this.setState({ score: parseInt(obj.score) });
    

    clearBoard() {
        const { rows, columns } = this.state;
        const map = [];
        for (let row = 0; row < rows; row++) {
            map[row] = [];
            for (let column = 0; column < columns; column++)
                map[row][column] = this.createArea(row, column);
        }
        this.setState({ map });
    }

    initBoard() {
        this.clearBoard()
        this.setState({ mapDidInit: true });
    }

    renderColumn(row) {
        const { map } = this.state;
        const columns = [];

        map[row].forEach(square => {
            columns.push(
                <td
                    className={"square " + className[square.state]}
                    key={`${row}_${square.column}`}
                ></td>
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
        connection.on('updateScore', obj => this.updateScore(obj));
        connection.on('gameOver', () => this.onGameOver())
        connection.start()
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
        return new Promise(resolve => {
            this.setState({ countdownIsOn: true, currentCountDown: milliseconds / 1000 }, async () => {
                for (let i = milliseconds / 1000; i > 0; i--) {
                    this.setState({ currentCountDown:  i});
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                this.setState({ countdownIsOn: false });
                resolve();
            });
        });
    }

    setBoard = async _ => await get("init", obj => 
        this.setState({ rows: obj.rows, columns: obj.columns, mapDidInit: true }, () => this.initBoard()));

    changeDirection = e => {
        e.stopPropagation();
        if (!this.validKeyCode(e.keyCode)) return;
         this.state.connection.invoke('ChangeDirection', e.key);
    }

    validKeyCode = code => code === 37 || code === 38 || code === 39 || code === 40

    updateSnakePosition(obj) {
        const { map, lastSquare } = this.state;
        const body = obj.snake;
        const food = obj.food;
        food.forEach(food => {
            map[food.row][food.column].state = states.FOOD;
        });

        if (lastSquare)
            map[lastSquare.row][lastSquare.column].state = states.UNVISITED;

        body.forEach(body => {
            map[body.row][body.column].state = states.PATH;
        });
        this.setState({ map, lastSquare: body[body.length - 1] });
        
    }

    onGameOver() {
        this.setState({ gameIsOn: false });
    }

    renderCountdown() {
        const { countdownIsOn, currentCountDown } = this.state;
        if (countdownIsOn) {
            return <Box 
            style={{ boxSizing: "border-box" }}
                        zIndex="10"
                        position="absolute"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        right="0"
                        left="0"
                        minHeight="98%"
                        color={green[600]}
                    >
                    <Typography variant="h1">{currentCountDown}</Typography>
                 </Box>
        } 
    }

    async startGame() {
        const { connection } = this.state;
        if (connection) {
            this.setState({ gameIsOn: true, score: 0 });
            this.clearBoard();
            await this.beginCountdown(3000);
            connection.invoke('StartGame')
                .catch(err => {
                    this.setState({ gameIsOn: false });
                    console.warn("Couldnt start the game. Try to refresh your browser.");
                });
        }
    }
    
    render() {

        const { score, gameIsOn } = this.state;

        
        return <React.Fragment>
            {this.renderCountdown()}
            
        <Appbar 
            startGame={this.startGame}
            score={score}
            gameIsOn={gameIsOn}
        />

        <GridContiner>  
            <table
                id="bob"
                style={{
                    width: '86vh',
                    height: '86vh',
                    margin: "8px"
                }}>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        </GridContiner>

        </React.Fragment>
    }
}
