import React, { Component } from 'react';
import { get } from "../Util/web";

export default class Map extends Component {

    constructor(props) {
        super(props);

        this.setBoard();

        this.state = {
            map: []
        }
    }

    async setBoard() {
        const { rowsPath, columnsPath } = this.props;
        await get(rowsPath, rows => this.setState({ rows }, () => console.log(this.state.rows)))
        await get(columnsPath, columns => this.setState({ columns }, () => console.log(this.state.columns)));
    }


    initBoard() {
        
    }

    updateSnakePosition(newPositions, erasedPositions) {

    }

    render() {
        
        return <React.Fragment>
            
        
        </React.Fragment>
    }
}
