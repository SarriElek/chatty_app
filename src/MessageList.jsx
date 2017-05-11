import React, {Component} from 'react';

import Message from './Message.jsx';

export default class MessageList extends Component {

  render() {
    var user_colors = this.props.userColors;
    var messagesList = this.props.messages.map((message) => {
        return (
            <Message message = {message} />
        )
    });

    return (
      <main className="messages">
        {messagesList}
      </main>
    );
  }
}