import React, { Component } from 'react';
import * as signalR from '@microsoft/signalr';

export default class SignalR extends Component {

    constructor(props) {
        super(props);

        this.connection = null;
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            map: []
        }
    }


    componentDidMount() {
         const protocol = new signalR.JsonHubProtocol();

         this.connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:5001/game")
            .withHubProtocol(protocol)
            .configureLogging(signalR.LogLevel.Information)
            .build();
        
        this.connection.on('sendMessageHi', this.onNotifyReceived);
        this.connection.start().then(_ => console.log("Connected!")).catch(err => console.log("Error: ", err));
    }

    onNotifyReceived(res) {
        console.log("Receiving : " + res);
    }

    updateSnakePosition(newPosition, erasedPosition) {

    }

    sendMessage() {
        this.connection
            .invoke('SendMessage', "Hello World!", " Space")
            .catch(err => console.log(err));
    }

    render() {
        return <React.Fragment>
        <button onClick={this.sendMessage}>Click</button>
        </React.Fragment>

    }
}
