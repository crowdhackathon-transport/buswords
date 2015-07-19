class Conversation {
  constructor(options) {
    this.id = options.id;
    this.me = options.me;
    this._messagesKey = 'conversation.' + this.id + '.messages';
    this.fetchMessages()
  }
  fetchMessages() {
    this._messages = localStorage.getItem(this._messagesKey);
    this.messages = (this._messages) ? JSON.parse(this._messages) : [];
  }
  addMessage(message) {
    if (!message.key) {
        message.key = this.id + '-' + Math.round(
          Math.random() * 10000000
        ).toString(16)
    }

    if (!message.sender) {
      message.sender = +localStorage.getItem('user');
    }

    this.messages.push(message);
    this._messages = JSON.stringify(this.messages);
    localStorage.setItem(this._messagesKey, this._messages);
  }

  getChatId() {
    return this.id.match(/-(\d+)$/)[1];
  }
}

Conversation.getCurrent = function () {
  return new Conversation({
    id: localStorage.getItem('conversation')
  })
}

export default Conversation;
