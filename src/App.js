import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import Filters from './Filters';
import SortOptions from './SortOptions';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [filters, setFilters] = useState({ gender: '', country: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredUsers = allUsers.filter(user => {
      const genderMatch = filters.gender ? user.gender.toLowerCase() === filters.gender.toLowerCase() : true;
      const countryMatch = filters.country ? user.address.country.toLowerCase().includes(filters.country.toLowerCase()) : true;
      return genderMatch && countryMatch;
    });

    const sortedUsers = filteredUsers.sort((a, b) => {
      const aValue = sortConfig.key === 'name' ? `${a.firstName} ${a.lastName}`.toLowerCase() : a[sortConfig.key];
      const bValue = sortConfig.key === 'name' ? `${b.firstName} ${b.lastName}`.toLowerCase() : b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers.slice(0, page * 10));
    setHasMore(filteredUsers.length > page * 10);
  }, [allUsers, sortConfig, filters, page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://dummyjson.com/users', {
        params: {
          limit: 1000, // Fetch a larger number if needed
        },
      });
      setAllUsers(response.data.users);
      setUsers(response.data.users.slice(0, page * 10));
      setHasMore(response.data.users.length > page * 10);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset page for new filters
  };

  return (
    <div className="App">
      {/* <h1>User List</h1> */}
      <Filters onChange={handleFilterChange} />
      <SortOptions onChange={handleSort} />
      <InfiniteScroll
        dataLength={users.length}
        next={() => setPage(prevPage => prevPage + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more users</p>}
      >
        {loading ? (
          <p className="loader">Loading...</p>
        ) : (
          <UserTable users={users} onSort={handleSort} sortConfig={sortConfig} />
        )}
      </InfiniteScroll>
    </div>
  );
};

export default App;
