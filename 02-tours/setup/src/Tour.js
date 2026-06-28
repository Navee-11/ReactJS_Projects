import React from "react";
import { useState } from "react";
// import { useRef } from "react";

const Tour = ({ id, name, info, image, price, func }) => {
  // const { name, info, image, price } = tour;
  const [readMore, setReadMore] = useState(false);
  // const divContainer = useRef(null);
  //  const handleDelete=()=>{
  //   divContainer.current.style.display="none";
  //  }

  return (
    <article className="single-tour">
      {/* <article className="single-tour" ref={divContainer}> */}
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">${price}</h4>
        </div>
        <p>
          {readMore ? info : info.substring(0, 200)}...
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? "Show Less" : "Read More"}
          </button>
        </p>
        <button className="delete-btn" onClick={() => func(id)}>
          Not Interested
        </button>
      </footer>
    </article>
  );
};

export default Tour;
