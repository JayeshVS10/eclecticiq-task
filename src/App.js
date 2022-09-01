import React from "react";
import { useEffect, useState } from "react";
import './App.css';

export default function App() {
  const [advice, setAdvice] = useState("loading...");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setAdvice(data.slip.advice);
      })
      .catch((e) => console.error(e));
  });

  function onClick(e) {
    e.preventDefault();

    setAdvice("loading");

    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setAdvice(data.slip.advice);
      })
      .catch((e) => console.error(e));
  }

  function onSubmit(e) {
    e.preventDefault();

    const term = e.target.term.value;

    fetch("https://api.adviceslip.com/advice/search/" + term)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.slips);
      })
      .catch((e) => console.error(e));
  }

  return (
    <main>
      <div className="app">
        <div className="top-card grow">
          <h1 className="heading">Need a good advice ?</h1>
          <p><strong>You are at the best place</strong></p>
        </div>

        <br />

        <div className="advice-card grow">
          <h1 className="heading">"{advice}"</h1>
          <form>
            <button className="button" onClick={onClick}>
              <span>GIVE ME ADVICE!</span>
            </button>
          </form>
        </div>
        <br />

        <div className="search-card grow">
          <form onSubmit={onSubmit}>
            <div>
              <h1 className="heading">Search for more advice:</h1>
            </div>
            <div className="search-form">
              <input type="text" name="term" />
              <button className="button">
                <span>Search</span>
              </button>
            </div>
          </form>
          <ul>
              {results.map((result) => (
                <li>{result.advice}</li>
              ))}
          </ul>
        </div>

      </div>
    </main>
  );
}
