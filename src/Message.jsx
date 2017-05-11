import React, {Component} from 'react';

const INCOMING_MESSAGE = "incomingMessage";
const INCOMING_NOTIFICATION = "incomingNotification";

export default class Message extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const klass = this.props.message.type === INCOMING_MESSAGE ? 'message' : 'message system';
    const colorKlass = "message-username-" + this.props.message.color;
    return (
      <div>
        <div className={klass}>
          { this.props.message.type === INCOMING_NOTIFICATION && this.props.message.content }
          { this.props.message.type === INCOMING_MESSAGE &&
            <div>
            <span className={colorKlass}>{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
            { this.props.message.url &&
              <img src={this.props.message.url}/>
            }
            </div>
          }
        </div>
      </div>
    );
  }
}