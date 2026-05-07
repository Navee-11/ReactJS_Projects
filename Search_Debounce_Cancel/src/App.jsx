import React, { useEffect, useState } from "react";
import useDebounce from "./hooks/debounce";

const fetchUsers = async (query) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}`,
  );

  if (!response.ok) throw new Error("API error");

  const data = await response.json();
  return data;
};

const App = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!debouncedSearch) {
      setUsers([]);
      return;
    }
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsers(debouncedSearch);
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [debouncedSearch]);
  return (
    <>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="SearchUsers...."
      />
      <br />
      {loading && <p>Loading....</p>}
      {error && <p>Error....</p>}

      {users?.total_count > 0 && (
        <ul style={{ display: "grid", gridTemplateColumns: "3fr 3fr 3fr" }}>
          {users?.items?.map((user, index) => {
            return (
              <li style={{ listStyleType: "none" }} key={index}>
                <img src={user.avatar_url} alt="" />
                <h3>{user.login}</h3>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default App;
