import React, { useState, useEffect } from 'react';
import Card from "../components/Card";
import useFetch from '../hooks/useFetch';
import useFetchTags from '../hooks/useFetchTags';
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "date");
  const [tag, setTag] = useState(searchParams.get("tag") || "");
  const [limit, setLimit] = useState(parseInt(searchParams.get("limit")) || 10);
  const [skip, setSkip] = useState(parseInt(searchParams.get("skip")) || 0);
  const [data, loading, total] = useFetch(`/search`, search, sort, tag, limit, skip);
  const [tags, tagsLoading] = useFetchTags();
  const [sortedData, setSortedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(Math.floor(skip / limit));

  const totalPages = Math.ceil(total / limit);
  const buttonsToShow = 10;

  // Handle sorting after data fetching
  useEffect(() => {
    const sorted = [...data];
    if (sort === "titleAsc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "titleDesc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }
    setSortedData(sorted);
  }, [data, sort]);

  // Filter data by selected tag
  useEffect(() => {
    if (tag) {
      const filtered = sortedData.filter(post => post.tags.includes(tag));
      setFilteredData(filtered);
    } else {
      setFilteredData(sortedData);
    }
  }, [tag, sortedData]);

  // Handle page change
  const pageChange = (page) => {
    const newSkip = page * limit;
    setSkip(newSkip);
    setCurrentPage(page);
    setSearchParams({ q: search, sort, tag, limit, skip: newSkip });
  };

  // Handle previous and next page
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      pageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      pageChange(currentPage + 1);
    }
  };

  // Determine which buttons to show
  const getPageButtons = () => {
    const start = Math.max(0, currentPage - Math.floor(buttonsToShow / 2));
    const end = Math.min(totalPages, start + buttonsToShow);
    const buttons = [];

    for (let i = start; i < end; i++) {
      buttons.push(i);
    }

    return buttons;
  };

  if (loading || tagsLoading) {
    return <p>Loading...</p>;
  }

  // Combine sortedData and filteredData
  const combinedData = tag ? filteredData : sortedData;

  return (
    <main className='container p-4'>
      <div className="d-flex align-items-center gap-2 mb-2">
        <input
          className="form-control rounded-pill"
          placeholder="Search ..."
          value={search}
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchParams({ q: e.target.value, sort, tag, limit, skip });
          }}
        />
        <select
          className="form-select form-select-sm rounded-pill"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setSearchParams({ q: search, sort: e.target.value, tag });
          }}
        >
          <option value="titleAsc">Sort by Title Ascending</option>
          <option value="titleDesc">Sort by Title Descending</option>
        </select>

        <select
          className="form-select rounded-pill p-2"
          value={tag}
          onChange={(e) => {
            const selectedTag = e.target.value.toLowerCase(); // Ensure consistent casing
            setTag(selectedTag);
            setSearchParams({ q: search, sort, tag: e.target.value, limit, skip });
          }}
        >
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag.id || tag.name} value={tag.id || tag.name}>
              {tag.name || tag}
            </option>
          ))}
        </select>
      </div>

      <div className='row g-col-6'>
        {combinedData.map((e, i) => (
          <Card
            className='col-12 col-md-6 col-lg-4 mb-2'
            id={e.id}
            title={e.title}
            body={e.body}
            key={i}
          />
        ))}

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center my-3">
            <li className="page-item">
              <button
                className="page-link"
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
              >
                Previous
              </button>
            </li>
            {getPageButtons().map((page) => (
              <li className="page-item" key={page}>
                <button
                  type="button"
                  className={`page-link ${currentPage === page ? "active" : ""}`}
                  onClick={() => pageChange(page)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default HomePage;
