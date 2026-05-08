import React, { useEffect, useEffectEvent, useState } from "react";
import useThrottle from "./hooks/throttle";

const App1 = () => {
  const [search, setSearch] = useState("");
  const throttleSearch = useThrottle(search, 1000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async (query) => {
    const response = await fetch(
      `https://api.github.com/search/users?q=${query}`,
    );

    if (!response.ok) {
      throw new Error("Fetching failed API error");
    }

    const data = await response.json();

    return data;
  };

  useEffect(() => {
    console.log(throttleSearch);
  }, [throttleSearch]);

  useEffect(() => {
    if (!throttleSearch) {
      return;
    }
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(throttleSearch);
        setUsers(data);
      } catch (error) {
        // setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [throttleSearch]);
  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          if (!value) setUsers([]);
        }}
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

export default App1;
