import React from "react";
import { posts } from "../postsData";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h3>Blog Posts</h3>
        <div>
          {posts.map(post => {
            return (
              <div key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
