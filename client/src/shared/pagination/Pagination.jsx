import React, { useContext, useEffect } from 'react';
import "./pagination.css";

import { PageContext } from '../../context/PageContext';

const Pagination = ({ pageCount }) => {

    const { page, dispatch } = useContext(PageContext);

    const startPage = page <= 3 ? 1 : page - 2;
    const endPage = page < 3 && pageCount >= 5 ? 5 : page + 2 > pageCount ? pageCount : page + 2;
    const pageLength = [];

    for (let i = startPage; i <= endPage; i++) {
        pageLength.push(i);
    }

    useEffect(() => {
        dispatch({ type: "START_PAGE" })
    }, [dispatch])

    return (
        <div className="pagination">
            {
                page <= 1 ? null
                    : <span onClick={() => dispatch({ type: "CURRENT_PAGE", payload: page - 1 })}>
                        {'<'}
                    </span>
            }

            {pageLength.map(number => (
                <span
                    key={number}
                    onClick={() => dispatch({ type: "CURRENT_PAGE", payload: number })}
                    className={page === number ? "active_page" : ""}>
                    {number}
                </span>
            ))}

            {
                page >= pageCount ? null :
                    <span onClick={() => dispatch({ type: "CURRENT_PAGE", payload: page + 1 })}>
                        {'>'}
                    </span>
            }
        </div>
    )
}

export default Pagination