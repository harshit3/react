import React, { Component } from "react";
import News from "../news";
import "./style.scss";
class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      openKey: ""
    };
  }
  componentDidMount() {
    this.props.handleLoadChange(true);
    this.fetchTopStories();
  }

  async fetchTopStories() {
    let response = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    const storyIds = await response.json();
    await this.fetchStories(storyIds.slice(0, 50));
  }

  async fetchStories(storyIds) {
    storyIds.forEach(async (storyId, index) => {
      let news = this.props.news;
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
      );
      const story = await response.json();
      news.push(story);
      if (index === storyIds.length - 1) {
        this.props.handleNewsChange(news, false);
      } else {
        this.props.handleNewsChange(news);
      }
    });
  }

  handleClick = storyId => {
    this.setState(state => {
      if (state.openKey === storyId) {
        return {
          openKey: ""
        };
      } else {
        return {
          openKey: storyId
        };
      }
    });
  };

  render() {
    return (
      <div>
        {this.props.news.length !== 0 ? (
          <div id="top" className="hacker-newslist">
            <div>
              <a href="#top" className="link-to-top">
                TOP
              </a>
            </div>
            {this.props.news.map(story => (
              <News
                key={story.id}
                story={story}
                openKey={this.state.openKey}
                handleClick={this.handleClick}
              />
            ))}
          </div>
        ) : (
          <div>No Results</div>
        )}
      </div>
    );
  }
}

export default NewsList;
