import React from "react";
import "./style.scss";
import debounce from 'lodash.debounce';

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: ""
    };
  }

  doSearch = debounce(() => {
    this.props.handleChange(this.state.searchKeyword)
  }, 300)

  handleChange = e => {
    const value = e.target.value;
    this.setState({ searchKeyword: value }, this.doSearch);
  };


  render() {
    const { value } = this.props;
    return (
      <div className="input-container">
        <input
          className="input-box"
          placeholder="Enter keyword..."
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default InputBox;
