import React, { Component } from 'react';
/*
export class Pagination extends Component{
    render() {
        const{ instancesPerPage, totalInstances, paginate, nextPage, prevPageCount } = this.props;
        
        const pageNumbers = [];

        for(let i = 1; i <= Math.ceil(instancesPerPage / totalInstances); i++) {
           pageNumbers.push(i);
        } 

        return (
            <nav> 
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link" href="#">Previous</a>
                    </li>
                    {pageNumbers.map(num => (
                        <li className="page-item" key={num}>
                            <a onClick={() => paginate(num)} href="#" className="page-link">{num}</a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination
*/