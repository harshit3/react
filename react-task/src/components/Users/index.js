import React, { PureComponent } from 'react';

import './users.scss';

class Users extends PureComponent {
    state={
        isIdAscending: true,
        isTypeAscending: false,
        isLoginAscending: false,
        isUrlAscending: false
    }

    sortUsersById = () => {
        const { users } = this.props;
        let { isIdAscending } = this.state;
        if(!isIdAscending){
            users.sort((a, b) => {
                return a.id-b.id;
            })
        }else{
            users.sort((a, b) => {
                return b.id-a.id;
            })    
        }
        this.setState({isIdAscending:!isIdAscending})
        this.props.setUsers({users});
    }

    sortUsers = (property, isAscending) => {
        const { users } = this.props;
        if(isAscending){
            users.sort((a, b) => {
                if(a[property].toLowerCase()<b[property].toLowerCase()){
                    return -1;
                }else if(a[property].toLowerCase()>b[property].toLowerCase()){
                    return 1;
                }else{
                    return 0;
                }
            })    
        }else{
            users.sort((a, b) => {
                if(a[property].toLowerCase()<b[property].toLowerCase()){
                    return +1;
                }else if(a[property].toLowerCase()>b[property].toLowerCase()){
                    return -1;
                }else{
                    return 0;
                }
            })     
        } 
        this.updateState(property,isAscending);
        this.props.setUsers({users});  
    }

    updateState = (property, isAscending) => {
        switch(property){
            case 'type':
                this.setState({isTypeAscending: !isAscending})
                break;
            case 'login':
                this.setState({isLoginAscending: !isAscending})
                break;
            case 'html_url':
                this.setState({isUrlAscending: !isAscending})
                break;
            default:
                break;
        }
    }


    renderUsers = () => {
        const { users, currentPage, rowsPerPage } = this.props;
        const indexOfLastTodo = currentPage * rowsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - rowsPerPage;
        const currentUsers = users.slice(indexOfFirstTodo, indexOfLastTodo);

        return currentUsers.map((user, index) => {
            return <div key={user.id} className="row-container">
                    <span><input type="radio" name="user" value={user.id} onClick={() => this.props.handleSelectUser(user.id)}/></span>
                    <span>{user.id}</span>
                    <span>{user.type}</span>
                    <span>{user.login}</span>
                    <span>{user.html_url}</span>
                </div>
        });
    };

    render() {
        return (
            <div className="users-container">
                <div className="row-container heading">
                    <span />
                    <span onClick={this.sortUsersById}>ID&nbsp;&nbsp;<span className={this.state.isIdAscending?"fa fa-caret-down":"fa fa-caret-up"}/></span>
                    <span onClick={() => this.sortUsers('type',this.state.isTypeAscending)}>Type&nbsp;&nbsp;<span className={this.state.isTypeAscending?"fa fa-caret-down":"fa fa-caret-up"}/></span>
                    <span onClick={() => this.sortUsers('login',this.state.isLoginAscending)}>LogIn&nbsp;&nbsp;<span className={this.state.isLoginAscending?"fa fa-caret-down":"fa fa-caret-up"}/></span>
                    <span onClick={() => this.sortUsers('html_url',this.state.isUrlAscending)}>URL&nbsp;&nbsp;<span className={this.state.isUrlAscending?"fa fa-caret-down":"fa fa-caret-up"}/></span>
                </div>
                {this.renderUsers()}
            </div>
        );
    }
}

export default Users;