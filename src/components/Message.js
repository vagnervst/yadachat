let React = require('react');
let PropTypes = require('prop-types');

class Message extends React.Component {

  render() {
    return (
      <section className="message-box sent">
        <div className="box-user-name">
          <h1>{ this.props.messageData.username }</h1>
        </div>
        <div className="box-user-message">
          <p>{ this.props.messageData.message }</p>
        </div>
      </section>
    );
  }

}

Message.propTypes = {
  messageData: PropTypes.object.isRequired
}

export default Message;
