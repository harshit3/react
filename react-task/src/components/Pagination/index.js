import React from "react";
import './pagination.scss';

class Paginator extends React.Component {

    renderPageNumbers = () => {
        const { users, rowsPerPage } = this.props;
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(users.length / rowsPerPage); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map(number => {
            return (
                <li className={`page-numbers ${this.props.currentPage===number?'highlight':''}`} key={number} id={number} onClick={this.props.handlePageClick}>
                    {number}
                </li>
            );
        });
    };

    renderRowsPerPageOptions = () => {
        const { users } = this.props;
        let options = [];
        for(let i=1;i<=users.length;i++){
            options.push(<option key={i} value={i}>{i}</option>)
        }
        return options;
    }

    selectRowsPerPage = (e) => {
        this.props.setRowsPerPage({
            currentPage: 1,
            rowsPerPage: Number(e.target.value)
        })
    }

    render() {
        const { users, currentPage, rowsPerPage } = this.props;
        const firstIndex = (currentPage-1)*rowsPerPage + 1;
        const lastIndex = ((firstIndex + rowsPerPage - 1)<=users.length)?(firstIndex + rowsPerPage - 1):users.length;
        return (
            <div className="pagination-container">
                <div className="page-nummbers-container">
                    <ul className="page-numbers-list">
                        {this.renderPageNumbers()}
                    </ul>
                </div>
                <div className="rows-perpage-selector">
                    <form onSubmit={e => e.preventDefault()}>
                        Rows per page:&nbsp;&nbsp;&nbsp;&nbsp; 
                        <select className="options" onChange={this.selectRowsPerPage} value={this.props.rowsPerPage}>
                            {this.renderRowsPerPageOptions()}
                        </select>
                    </form>
                </div>
                <div>
                    {`${firstIndex}-${lastIndex} of ${users.length}`}
                </div>
            </div>
        );
    }
}

export default Paginator;