  import React, { useState } from "react";
import data from "./data";
import SingleQuestion from "./Question";
function App() {
  const [questions, setQuestions] = useState(data);
  const [newIndex, setNewIndex] = useState(null);
  //this is used in the parent component because all Question component are synchronised so if any change done in the single component it affects other as well there by you can close the previously open accordion.
  //If this done in the child component the Question component are not synchronised i.e., the change in one component doesnot affect the other component

  return (
    <main>
      <div className="container">
        <h3>questions and answers about the login</h3>
        <section className="info">
          {questions.map((question, index) => {
            return (
              <SingleQuestion
                key={question.id}
                question={question}
                index={index}
                newIndex={newIndex}
                setNewIndex={setNewIndex}
              />
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default App;
