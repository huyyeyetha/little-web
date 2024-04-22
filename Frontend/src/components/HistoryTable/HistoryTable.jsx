import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getSensorInfo, getPageData } from '../../services/webService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './HistoryTable.scss';

function HistoryTable({ gardenId, sensorId }) {
    const [unit, setUnit] = useState('');
    const [filterValue, setFilterValue] = useState({ start: '', end: '' });
    const [submitFilter, setSubmitFilter] = useState({ start: '', end: '' });
    const [filtered, setFiltered] = useState(false);

    const [pageData, setPageData] = useState([]);
    const [pageCount, setPageCount] = useState(-1);
    const [currPage, setCurrPage] = useState(1);

    const handlePageClick = (event) => {
        getData(event.selected + 1, submitFilter.start, submitFilter.end);
    };
    const handleFilter = () => {
        if (filterValue.start !== '' && filterValue.end !== '') {
            if (new Date(filterValue.start) >= new Date(filterValue.end)) {
                alert('Ngày bắt đầu phải trước ngày kết thúc !');
                return;
            }
        }
        getData(currPage, filterValue.start, filterValue.end);
        setSubmitFilter({ ...filterValue });
        setFiltered(true);
    };
    const handleUnFilter = () => {
        setFilterValue({ start: '', end: '' });
        setSubmitFilter({ start: '', end: '' });
        getData(currPage, '', '');
        setFiltered(false);
    };
    const handleRefresh = () => {
        if (submitFilter.start !== '' && submitFilter.end !== '') {
            if (new Date(submitFilter.start) >= new Date(submitFilter.end)) {
                alert('Ngày bắt đầu phải trước ngày kết thúc !');
                return;
            }
        }
        getData(currPage, submitFilter.start, submitFilter.end);
    };

    useEffect(() => {
        const getUnit = async () => {
            const raw = await getSensorInfo(sensorId);
            if (raw.EC === 0) setUnit(raw.DT.unit);
        };
        getUnit();
        getData(currPage, filterValue.start, filterValue.end);
    }, []);
    const getData = async (page, from, to) => {
        let res = await getPageData(gardenId, sensorId, page, 10, from, to);
        if (res) {
            if (res.EC === 0) {
                if (page > res.DT.numPage) {
                    if (res.DT.numPage === 0) {
                        setPageCount(0);
                        setPageData([]);
                        setCurrPage(1);
                    } else {
                        getData(res.DT.numPage, from, to);
                    }
                } else {
                    setPageCount(res.DT.numPage);
                    setPageData(res.DT.data);
                    setCurrPage(page);
                }
            } else {
                alert(res.EM);
            }
        }
    };

    return (
        <div className="history-table">
            <div className="filter d-flex align-items-center mb-2 py-1 gap-2">
                <label htmlFor="start">Từ</label>
                <input
                    type="date"
                    id="start"
                    className="form-control me-3"
                    value={filterValue.start}
                    onChange={(e) => setFilterValue({ ...filterValue, start: e.target.value })}
                />
                <label htmlFor="end">Đến</label>
                <input
                    type="date"
                    id="end"
                    className="form-control me-4"
                    value={filterValue.end}
                    onChange={(e) => setFilterValue({ ...filterValue, end: e.target.value })}
                />
                <button
                    className="btn btn-primary"
                    disabled={filterValue.start === '' && filterValue.end === ''}
                    onClick={handleFilter}
                >
                    Lọc
                </button>
                <button className="btn btn-danger" disabled={!filtered} onClick={handleUnFilter}>
                    Hủy
                </button>
            </div>
            <div className="table border border-dark rounded mb-2 p-2">
                {pageData.length === 0 ? (
                    <p className="text-center fs-5">{pageCount === -1 ? 'Loading...' : 'No data'}</p>
                ) : (
                    pageData.map((data, index) => (
                        <div key={index} className="fs-5 d-flex ps-4 pe-3">
                            <p className="time m-0">{data.time}</p>:
                            <p className="m-auto me-5 pe-5">
                                {data.value} {unit}
                            </p>
                        </div>
                    ))
                )}
            </div>
            <div className="pagination d-flex justify-content-between">
                <button className="btn btn-outline-primary ms-4" onClick={handleRefresh}>
                    Tải lại <FontAwesomeIcon icon={faArrowRotateLeft} />
                </button>
                <ReactPaginate
                    nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>
        </div>
    );
}

export default HistoryTable;
