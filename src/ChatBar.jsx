import React, {Component} from 'react';

const USER_NAME = "USER_NAME";
const CONTENT = "CONTENT";

export default class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      [USER_NAME]: this.props.currentUser.name,
      [CONTENT]: ''
    }
  }

  onMessageKeyPress = (event) => {
    if(event.key === 'Enter') {
      this.props.onNewMessage(this.state.CONTENT);
      this.setState({ [CONTENT]: '' });
      //this.props.onEnter(event.target.value, this.state.userName);
    }
  }

  onUsernameKeyPress = (event) => {
    if(event.key === 'Enter') {
      this.props.onUsernameChange(this.state.USER_NAME);
    }
  }

  onUsernameBlur = () => {
    this.props.onUsernameChange(this.state.USER_NAME);
  }

  // These functions are only defined when in class is initialized, so more performant

  // onMessageChange = (event) => {
  //   // console.log(event.target.value);
  //   this.setState({ content: event.target.value });
  // }

  // onUsernameChange = (event) => {
  //   this.setState({ userName: event.target.value });
  // }

  onInputChanged = (key) => (event) => { // The inner function is going to be created every time render() is called, so not as performant
    this.setState({ [key]: event.target.value });
  }

  doSomething() {

  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Username"
          value={this.state.USER_NAME}
          onChange={this.onInputChanged(USER_NAME)}
          onKeyPress={this.onUsernameKeyPress}
          onBlur={this.onUsernameBlur}
          />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onMessageKeyPress}
          onChange={this.onInputChanged(CONTENT)}
          value={this.state.CONTENT}
        />
      </footer>
    );
  }
}