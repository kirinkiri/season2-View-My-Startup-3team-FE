import { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

const COMPARISON_API_BASE_URL = 'http://localhost:3000/api/comparisons';

// const sessionId = localStorage.getItem('sessionId') || uuidv4();
// localStorage.setItem('sessionId', sessionId);

export default function useFetchMyStartup() {
  const [startups, setStartups] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRecentStartups = async (search = '', page = 1, limit = 5) => {
    try {
      const response = await fetch(
        `${COMPARISON_API_BASE_URL}/recent-select?search=${search}&page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setStartups(data.list);
      setTotalCount(data.totalCount);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to fetch startups', err);
    }
  };

  useEffect(() => {
    fetchRecentStartups();
  }, []);

  const searchStartups = (searchText) => {
    fetchRecentStartups(searchText); // 검색어가 변경될 때 데이터를 가져옴
  };

  const goToPage = (page) => {
    fetchRecentStartups('', page); // 지정된 페이지로 이동
  };

  return {
    startups,
    totalCount,
    currentPage,
    totalPages,
    searchStartups,
    goToPage
  };
}
