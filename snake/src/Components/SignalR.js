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
        //  const protocol = new signalR.JsonHubProtocol();

        //  const connection = new signalR.HubConnectionBuilder()
        //     .withUrl("https://localhost:5001/game")
        //     .withHubProtocol(protocol)
        //     .configureLogging(signalR.LogLevel.Information)
        //     .build();

        // this.connection = connection;
        // this.setState({ connection });
        
        // connection.on('sendMessageHi', this.onNotifyReceived);
        // connection.start()
        //     .then(_ => console.log("Established connection."))
        //     .catch(err => console.log("Establishing connection to server failed.")));
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
