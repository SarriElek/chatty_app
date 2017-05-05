import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const INCOMING_MESSAGE = "incomingMessage";
const INCOMING_NOTIFICATION = "incomingNotification";
const INCOMING_USER_INFO = 'incomingUserInfo';
const POST_MESSAGE = 'postMessage';
const POST_NOTIFICATION = 'postNotification';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"},
      connectedUsers: '',
      messages: []
    }
    this.id = 3;
    this.socket;
  }

  get newId() {
    return this.id++;
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = this.onIncomingMessage;
  }

  onIncomingMessage = (event) => {
    const data = JSON.parse(event.data);
    switch(data.type){
      case INCOMING_MESSAGE:
        this.setState({ messages: [...this.state.messages, data]});
        break;
      case INCOMING_NOTIFICATION:
        this.setState({ messages: [...this.state.messages, data]});
        break;
      case INCOMING_USER_INFO:
        this.setState({ connectedUsers: data.content});
      default:
        throw new Error(`Unknown event type ${data.type}`);
    }

  }

  onNewMessage = (content) => {
    const newMessage = {
      type: POST_MESSAGE,
      id: this.newId,
      username: this.state.currentUser.name,
      content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  onUsernameChange = (username) => {
    const oldUserName = this.state.currentUser.name;
    const newMessage = {
      type: POST_NOTIFICATION,
      username,
      content: `User ${oldUserName} changed their name to ${username}`,
    };
    this.setState({ currentUser: { name: username }});
    this.socket.send(JSON.stringify(newMessage));;
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a><p className='navbar-info'>{this.state.connectedUsers}</p>
        </nav>
        <MessageList messages={this.state.messages} userColors={this.state.userColors}/>
        <ChatBar currentUser={this.state.currentUser} onNewMessage={this.onNewMessage} onUsernameChange={this.onUsernameChange} />
      </div>
    );
  }
}