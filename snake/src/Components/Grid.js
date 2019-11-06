import React, { Component } from 'react';

export default class Grid {

    constructor(props) {
        this.state = {
            map: props.map
        }
    }

    renderRows() {
        const { map } = this.state;
        const grid = [];
        map.forEach((row, i) => {
            grid[i] = 
            <tr key={i}>
                {this.renderColumn()}
            </tr>
        })
    }

    renderColumn() {

    }

    renderMap() {

    }

    render () {

        const {map} = this.state;

        
    }
}
