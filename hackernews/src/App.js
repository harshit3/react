import React, { Component } from "react";
import Header from "./components/header";
import NewsList from "./components/newslist";
import LoadingOverlay from "react-loading-overlay";
import "./App.css";

class App extends Component {
  state = {
    searchQuery: "",
    fullNewsList: [],
    news: [],
    isLoading: false
  };

  handleSearchChange = e => {
    let news = [];
    this.state.fullNewsList.forEach(story => {
      if (
        e.target.value !== "" &&
        story.title.toUpperCase().includes(e.target.value.toUpperCase())
      ) {
        news.push(story);
      }
    });
    if (e.target.value === "") {
      this.setState({ news: this.state.fullNewsList });
    } else {
      this.setState({ news });
    }
  };

  handleLoadChange = isLoading => {
    this.setState({ isLoading });
  };

  handleNewsChange = (fullNewsList, isLoading) => {
    if (isLoading === undefined) {
      this.setState({ fullNewsList, news: fullNewsList });
    } else {
      this.setState({ fullNewsList, news: fullNewsList, isLoading });
    }
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.isLoading}
        spinner
        text="Loading News..."
        styles={{
          content: base => ({
            ...base,
            position: "fixed",
            top: "50%",
            left: "45%"
          })
        }}
      >
        <div className="App">
          <Header
            handleSearchChange={this.handleSearchChange}
            newsCount={this.state.news.length}
            isLoading={this.state.isLoading}
          />
          <NewsList
            handleNewsChange={this.handleNewsChange}
            handleLoadChange={this.handleLoadChange}
            news={this.state.news}
            isLoading={this.state.isLoading}
          />
        </div>
      </LoadingOverlay>
    );
  }
}

export default App;
