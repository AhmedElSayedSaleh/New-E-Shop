import React from 'react';
import '../styles/Pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-wrapper">
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(1)}
                            disabled={currentPage === 1}
                        >
                            الأولى
                        </button>
                    </li>

                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            السابق
                        </button>
                    </li>

                    {startPage > 1 && (
                        <>
                            <li className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        </>
                    )}

                    {pageNumbers.map((number) => (
                        <li
                            key={number}
                            className={`page-item ${currentPage === number ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageChange(number)}
                            >
                                {number}
                            </button>
                        </li>
                    ))}

                    {endPage < totalPages && (
                        <>
                            <li className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        </>
                    )}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            التالي
                        </button>
                    </li>

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            الأخيرة
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
