import React, {Component} from 'react';

const INCOMING_MESSAGE = "incomingMessage";
const INCOMING_NOTIFICATION = "incomingNotification";

export default class Message extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const klass = this.props.type === INCOMING_MESSAGE ? 'message' : 'message system';
    return (
      <div>
        <div className={klass}>
          { this.props.type === INCOMING_NOTIFICATION && this.props.content }
          { this.props.type === INCOMING_MESSAGE &&
            <div>
            <span className={this.props.color}>{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
            { this.props.url &&
              <img src={this.props.url}/>
            }
            </div>
          }
        </div>
      </div>
    );
  }
}