import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  const { loading, data } = useFetch();
  console.log(data);

  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    else setFollowers(data[page]);
  }, [loading, page]);
  const handlePage = (index) => {
    setPage(index);
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) prevPage = data.length - 1;
      return prevPage;
    });
  };
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) nextPage = 0;
      return nextPage;
    });
  };

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "loading...." : "pagination"}</h1>
        <div className="underline"></div>
        <section className="follower">
          <div className="container">
            {followers.map((follower, index) => {
              return <Follower {...follower} key={index} />;
            })}
          </div>
          {!loading && (
            <div className="btn-container">
              <button className="prev-btn" onClick={prevPage}>
                prev
              </button>
              {data.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`page-btn ${
                      index === page ? "active-btn" : null
                    }`}
                    onClick={() => handlePage(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
              <button className="prev-btn" onClick={nextPage}>
                next
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
