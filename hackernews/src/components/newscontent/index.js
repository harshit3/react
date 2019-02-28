import React from "react";

export default function NewsContent(props) {
  return (
    <div className="news-content">
      {props.story.title}
      <p>News description</p>
    </div>
  );
}
