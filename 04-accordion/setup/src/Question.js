import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Question = ({ question, index, newIndex, setNewIndex }) => {
  const { title, info } = question;

  return (
    <article className="question">
      <header>
        <h4>{title}</h4>
        <button
          className="btn"
          onClick={(e) => {
            setNewIndex(index === newIndex ? null : index);
          }}
        >
          {index === newIndex ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {index === newIndex && <p>{info}</p>}
    </article>
    // <h2>Tour Component</h2>
  );
};

export default Question;
