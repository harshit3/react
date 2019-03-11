import React from "react";
import Charts from './components/Charts'
import Paginator from "./components/Pagination";
import Users from "./components/Users";
import './App.scss';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      rowsPerPage: 3,
      searchQuery: '',
      filteredUsers: [],
      selectedUser: ''
    };
  }

  async componentDidMount() {
    const response = await fetch("https://api.github.com/users");
    const users = await response.json();
    this.setState({ users, selectedUser: users[0] });
  }

  handlePageClick = (e) => {
    this.setState({
        currentPage: Number(e.target.id)
    });
  }

  setRowsPerPage = (pageObj) => {
    this.setState(pageObj)
  }

  setUsers = (userObj) => {
    this.setState({...userObj, currentPage:1})
  }

  handleSelectUser = (userId) => {
    let selectedUser = this.state.users.filter(user => {
      return user.id ===userId
    })[0]
    this.setState({
      selectedUser
    })
  }

  handleChangeSearch = (e) => {
    const value = e.target.value;
    const filteredUsers = this.state.users.filter(user => {
      return (user.type.toLowerCase().includes(value.toLowerCase()) || 
              user.login.toLowerCase().includes(value.toLowerCase()) || 
              user.html_url.toLowerCase().includes(value.toLowerCase()));
    })
    this.setState({
      filteredUsers,
      searchQuery: value
    })
  }

  render() {
    const { users, filteredUsers, currentPage, rowsPerPage, selectedUser } = this.state;
    if(this.state.users){
      return (
        <div>
          <Charts 
            user={selectedUser}
          />
          <br /><hr />
          <div className="user-table-header">
            <div>Overview Data</div>
            <input 
              type="text" 
              placeholder="Search..." 
              onChange={this.handleChangeSearch}
            />  
          </div>
          <Users 
            users={this.state.searchQuery?filteredUsers:users}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            setUsers={this.setUsers}
            handleSelectUser={this.handleSelectUser}
          />
          <Paginator 
            users={this.state.searchQuery?filteredUsers:users}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}  
            handlePageClick={this.handlePageClick}
            setRowsPerPage={this.setRowsPerPage}
          />
        </div>
      );
    }else{
      return null;
    }

  }
}

export default App;
