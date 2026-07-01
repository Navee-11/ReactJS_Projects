import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const inputRef = React.useRef("");

  const searchCocktail = () => {
    setSearchTerm(inputRef.current.value);
  };
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="section search">
      <form action="" className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Search your favourite cocktail</label>
          <input
            id="name"
            type="text"
            ref={inputRef}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
