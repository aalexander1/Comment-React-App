// Create a way to collect user comments and then delete them
// Create a thumbs up / thumbs down counter for these comments
// Create a way to write responses to the original comment
// Create a thumbs up / thumbs down counter for these comments and ability to delete

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      comments: [], // comments is going to be an array of objects
      currentCommentText: '',
      showReplyField: false,
      currentResponse: '',
      currentCommentIndex: 0
    }

    this.addComment = this.addComment.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.handleThumbsUp = this.handleThumbsUp.bind(this);
    this.handleThumbsDown = this.handleThumbsDown.bind(this);
  }

  addComment() {
    const comments = [...this.state.comments];
    const newComment = {
      text: this.state.currentCommentText,
      responses: [],
      thumbsUp: 0,
      thumbsDown: 0
    };
    comments.push(newComment);
    this.setState({ comments, currentCommentText: '' });
  }

  handleInputChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleThumbsUp(i) {
    return function(e) {
      console.log('handleThumbsUp called for element ', i)
    }
  }

  handleThumbsDown(i) {
    return function(e) {
      console.log('handleThumbsDown called for element ', i)
    }
  }

  handleDeleteComment(i) {
    const self = this;
    return function(e) {
      // remove that comment from the state
      const allComments = self.state.comments;
      allComments.splice(i, 1);
      self.setState({ comments: allComments });
    }
  }

  handleReply() {
    const self = this;
    return function(e) {
      const allComments = self.state.comments;
      allComments[self.state.currentCommentIndex].responses.push(self.state.currentResponse);
      self.setState({comments: allComments, showReplyField: false});
    }
  }

  showReply(i) {
    const self = this;
    return function(e) {
      self.setState({showReplyField: true, currentCommentIndex: i});
    }
  }

  renderComments() {
    const self = this;
    return this.state.comments.map(function(comment, index) {
      return (
        <li key={index}>
          {comment.text}
          {
            comment.responses.map(function(aResponse, index) {
              return <div key={index}><span >{aResponse}</span><br/></div>
            })
          }
          <div>
            <input type="button" value="thumbsUp" onClick={self.handleThumbsUp(index)} />
            <input type="button" value="thumbsDown" onClick={self.handleThumbsDown(index)} />
            <input type="button" value="Delete" onClick={self.handleDeleteComment(index)} />
            <input type="button" value="Reply" onClick={self.showReply(index)} />
          </div>
        </li>
      )
    });
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.renderComments()}
        </ul>
        <input id="currentCommentText" type="text" onChange={this.handleInputChange} value={this.state.currentCommentText} />
        <input type="button" onClick={this.addComment} value="Submit" />

        
        {
          (this.state.showReplyField) 
            ? <div>
                <input id="currentResponse" type="text" placeholder="Enter reply" onChange={this.handleInputChange} value={this.state.currentResponse} />
                <input type="button" value="thumbsUp" onClick={this.handleThumbsUp()} />
                <input type="button" onClick={this.handleReply()} value="Reply" />
              </div>
            : null
        }
      </div>
    );
  }
}

export default App;
