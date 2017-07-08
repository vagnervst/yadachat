import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Message extends React.Component {

  render() {
    let isMessageFromMe = this.props.currentUserId === this.props.messageData.userId;
    let messageSentTime = moment.unix(this.props.messageData.time);
    let sentDaysAgo = moment().diff( messageSentTime, 'days' );        

    let messageLabel = "";
    switch( sentDaysAgo ) {
      case 0:
        messageLabel = "Today at " + messageSentTime.format("HH:mm");
        break;
      case 1:
        messageLabel = "Yesterday at " + messageSentTime.format("HH:mm");
        break;
      default:
        messageLabel = messageSentTime.format("DD MMM YYYY HH:mm");
    }

    return (
      <section className={"message-box " + ( isMessageFromMe ? 'sent' : '') }>
        <div className="box-user-name">
          <h1>{ this.props.messageData.username }</h1>
        </div>
        <div className="box-user-message">
          <p className="timestamp">{ messageLabel }</p>
          <p>{ this.props.messageData.message }</p>
        </div>
      </section>
    );
  }

}

Message.propTypes = {
  currentUserId: PropTypes.string.isRequired,
  messageData: PropTypes.object.isRequired
}

export default Message;
