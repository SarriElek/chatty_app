import React, {Component} from 'react';

import Message from './Message.jsx';

export default class MessageList extends Component {

  render() {
    var user_colors = this.props.userColors;
    var messagesList = this.props.messages.map((message) => {
        return (
            <Message key = {message.id}
                username = {message.username}
                content = {message.content}
                type = {message.type}
                url = {message.url}
                color = {message.color}
            />
        )
    });

    return (
      <main className="messages">
        {messagesList}
      </main>
    );
  }
}