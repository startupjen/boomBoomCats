import React from 'react'
import io from 'socket.io-client'
let socket = io()

export default class Chat extends React.Component {

  constructor() {
    super()
    this.state = {
      messages: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    var socket = io()
    socket.on('chat message', function(msg) {
      this.setState({
        messages: [...this.state.messages, msg]
      })
    }.bind(this))
  }

  handleSubmit(e) {
    e.preventDefault()
    socket.emit('chat message', this.refs.message.value)
    this.refs.message.value = ''
    return false
  }

  render() {

    return (

      <div id='chatWindow'>

        <ul id='messages'>

          {this.state.messages.map((message, i) => 
            (<li>
              {message}  
            </li>)
          )}

        </ul>
        
        <form action='' id='chatForm' onSubmit={this.handleSubmit}>
          <input autoComplete='off' ref='message' />
        </form>

      </div>

    )
  }

}