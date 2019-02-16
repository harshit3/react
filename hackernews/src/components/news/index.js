import React from "react";
import "./style.scss";

export default function News(props) {
  return (
    <div className="hacker-new-container">
      <div className="hacker-news-heading">{props.story.title}</div>
      <div className="hacker-news-description">
        <span>{props.story.by}</span>
        <span>{new Date(props.story.time * 1000).toString().slice(0, 24)}</span>
        <span>{props.story.kids ? props.story.kids.length : 0} Comments</span>
        <span>({props.story.url})</span>
      </div>
    </div>
  );
}
