import React, { lazy, Suspense, Component } from "react";
import "./style.scss";
//import NewsContent from '../newscontent';

const NewsContent = lazy(() => import("../newscontent"));

class News extends Component {
  state = {
    isOpen: false
  };

  preventClick = e => {
    e.stopPropagation();
  };

  render() {
    return (
      <div
        className="hacker-new-container"
        onClick={() => this.props.handleClick(this.props.story.id)}
      >
        <div className="hacker-news-heading">{this.props.story.title}</div>
        <div className="hacker-news-description">
          <span>{this.props.story.by}</span>
          <span>
            {new Date(this.props.story.time * 1000).toString().slice(0, 24)}
          </span>
          <span>
            {this.props.story.kids ? this.props.story.kids.length : 0} Comments
          </span>
          <span>({this.props.story.url})</span>
        </div>
        <div
          className={`news-content ${
            this.props.openKey === this.props.story.id ? "active" : "collapsed"
          }`}
          onClick={this.preventClick}
        >
          {this.props.openKey === this.props.story.id ? (
            <Suspense fallback={<div>fetching...</div>}>
              <NewsContent story={this.props.story} />
            </Suspense>
          ) : null}
        </div>
      </div>
    );
  }
}

export default News;
