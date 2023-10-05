

import "./App.css";
import { useEffect, useState } from "react";

import {
  postJoke,
  getAllTheJokes,
  updateJoke,
  deleteJoke
} from "./services/jokeServices";

export const App = () => {
  const [inputJokes, setInputJokes] = useState("");
  const [postData, setPostData] = useState({});
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [unToldCount, setUnToldCount] = useState(0); // Initialize as a number
  const [toldCount, setToldCount] = useState(0); // Initialize as a number

  const handleToggleTold = (joke) => {
    const editedJoke = {
      ...joke,
      told: !joke.told,
    };

    updateJoke(editedJoke).then(() => {
      getAllTheJokes().then((jokesArray) => {
        setAllJokes(jokesArray);
        setUntoldJokes(jokesArray.filter((joke) => !joke.told));
        setToldJokes(jokesArray.filter((joke) => joke.told));
        setUnToldCount(jokesArray.filter((joke) => !joke.told).length);
        setToldCount(jokesArray.filter((joke) => joke.told).length);
      });
    });
  };

  const handleDeleteJoke = (joke) => {
    deleteJoke(joke.id).then(() => {
      getAllTheJokes().then((jokesArray) => {
        setAllJokes(jokesArray);
        setUntoldJokes(jokesArray.filter((j) => !j.told));
        setToldJokes(jokesArray.filter((j) => j.told));
        setUnToldCount(jokesArray.filter((j) => !j.told).length);
        setToldCount(jokesArray.filter((j) => j.told).length);
      });
    });
  };

  useEffect(() => {
    getAllTheJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
      setUntoldJokes(jokesArray.filter((joke) => !joke.told));
      setToldJokes(jokesArray.filter((joke) => joke.told));
      setUnToldCount(jokesArray.filter((joke) => !joke.told).length);
      setToldCount(jokesArray.filter((joke) => joke.told).length);
    });
  }, []);

  const handleJokesSave = () => {
    postJoke(inputJokes).then((data) => {
      setPostData(data);
    });
  };

  useEffect(() => {
    setInputJokes("");
  }, [postData]);

  const handleInputChange = (event) => {
    setInputJokes(event.target.value);
  };

  return (
    <div>
      <div>
        <h1>Chuckle Checklist</h1>
        <input
          className="inputButton"
          placeholder="New Joke Here"
          type="text"
          value={inputJokes}
          onChange={handleInputChange}
        />
        <button onClick={handleJokesSave}>Add</button>
      </div>

      <div>
        <div>Untold</div>
        <div>{unToldCount}</div>
        <ul>
          {untoldJokes.map((joke) => {
            return (
              <li className="joke" key={joke.id}>
                {joke.text}
                <button onClick={() => handleToggleTold(joke)}>
                  {joke.told ? "Untold" : "Told"}
                </button>
                <button onClick={() => handleDeleteJoke(joke)}>Delete</button>
              </li>
            );
          })}
        </ul>
        <div>Told</div>
        <div>{toldCount}</div>
        <ul>
          {toldJokes.map((joke) => {
            return (
              <li className="joke" key={joke.id}>
                {joke.text}
                <button onClick={() => handleToggleTold(joke)}>
                  {joke.told ? "Untold" : "Told"}
                </button>
                <button onClick={() => handleDeleteJoke(joke)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};















