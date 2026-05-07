import React, { useEffect, useState } from "react";
import useDebounce from "./hooks/debounce";

const fetchUsers = async (query, signal) => {
  /* const response = await fetch(
    `https://api.github.com/search/users?q=${query}`,
  ); */
  //Adding Abort controller
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}`,
    { signal },
  );

  if (!response.ok) throw new Error("API error");

  const data = await response.json();
  return data;
};

//Abort Controller-To cancel previous or unnecessary async operations during cleanup, preventing race conditions, memory leaks, and stale UI updates.
//It cancels/aborts request

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

    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsers(debouncedSearch, controller.signal);
        setUsers(data);
      } catch (err) {
        // console.log(err);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUsers();

    return () => {
      controller.abort();
    };
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
      {error && <p>Error....{error}</p>}

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
