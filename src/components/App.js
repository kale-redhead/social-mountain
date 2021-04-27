import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then( result => {
      this.setState({ posts: result.data });
    });
  }

  updatePost( id, text ) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then( result => {
      this.setState({ posts: result.data });
    });
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( result => {
      this.setState({ posts: result.data });
    });
  }

  createPost(text) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ text }`).then( result => {
      this.setState({ posts: result.data });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn = { this.createPost }/>
          
          {
            posts.map( post => (
            <Post key = { post.id }
                  id = { post.id }
                  text = { post.text }
                  date = { post.date } 
                  updatePostFn = { this.updatePost }
                  deletePostFn = { this.deletePost } />))
          }

        </section>
      </div>
    );
  }
}

export default App;
