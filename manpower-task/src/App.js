import React from "react";
import InputBox from "./components/inputbox/InputBox";
import Card from "./components/card/Card";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
  }

  findRepos = async searchKeyword => {
    if (searchKeyword) {
      const url = `https://api.github.com/search/repositories?q=${searchKeyword}`;
      const response = await fetch(url);
      let repos = await response.json();
      repos = repos.items || [];
      this.setState({ repos });
    } else {
      this.setState({ repos: [] });
    }
  };

  handleChange = searchKeyword => {
    this.findRepos(searchKeyword);
  };

  render() {
    return (
      <>
        <InputBox handleChange={this.handleChange} />
        {this.state.repos.map(repo => {
          return <Card key={repo.id} repo={repo} />;
        })}
      </>
    );
  }
}


export default App;
