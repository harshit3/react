import React from "react";
import "./style.scss";

function focusInputBox(isLoading) {
  if (!isLoading && document.getElementById("my-input")) {
    document.getElementById("my-input").focus();
  }
}

export default function Header(props) {
  focusInputBox(props.isLoading);
  return (
    <div className={`hacker-grid`}>
      <div className="hacker-logo">HackerNews</div>
      <div>
        <input
          id="my-input"
          className="hacker-input"
          type="text"
          name="searchQuery"
          placeholder="Enter the search query"
          onChange={props.handleSearchChange}
        />
      </div>
      <div className="hacker-info">by algolia</div>
      <div>News count:{props.newsCount}</div>
    </div>
  );
}
