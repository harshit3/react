import React, { Component } from "react";
import { Link } from "react-router-dom";
import { allPosts, recommendedPosts } from "../postsData";

class PostDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postDetails: {
        id: "",
        title: "",
        body: ""
      }
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { postid }
      }
    } = this.props;
    this.fetchPostData(postid);
  }

  fetchPostData = postid => {
    const post = allPosts.find(post => post.id == postid);
    this.setState({
      postDetails: post
    });
  };

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { postid }
      }
    } = this.props;
    const prevPostId = prevProps.match.params.postid;
    if (prevPostId !== postid) {
      this.fetchPostData(postid);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.postDetails.title}</h1>
        </header>
        <p className="lead">{this.state.postDetails.body}</p>
        <section>
          <h4>Recommended Posts</h4>
          {recommendedPosts.map(post => (
            <div key={post.id}>
              <Link to={`/post/${post.id}`}>
                <p>{post.title}</p>
              </Link>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default PostDetails;
