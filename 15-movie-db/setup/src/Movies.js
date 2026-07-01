import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Movies = () => {
  const { loading, movies } = useGlobalContext();
  if (loading) return <div className="loading"></div>;

  return (
    <section className="movies">
      {movies.map((movie, index) => {
        const { imdbID: id, Poster: image, Title: title, Year: year } = movie;
        return (
          <Link to={`/movies/${id}`} key={index} className="movie">
            <article>
              <img src={image === "N/A" ? url : image} alt={title} />
              <div className="movie-info">
                <h4 className="title">{title}</h4>
                <p>{year}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default Movies;
