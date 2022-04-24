import { useState } from "react";

const Button = (props) => {
  return (
    <button type="button" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const fillArray = (length, number) => {
    return Array(length).fill(number);
  };

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(fillArray(anecdotes.length, 0));

  // generate random int from 0 to arr.length and shoot it to useState

  const generateRandomInt = (min, max) => {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  };

  const handleVotes = () => {
    const voteCopy = [...votes];
    voteCopy[selected] += 1;
    setVotes(voteCopy);
  };

  // need to the array by max votes and extract index

  const getMostVoted = () => {
    const max = Math.max(...votes);
    return votes.indexOf(max);
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <br></br>
      <p>votes: {votes[selected]}</p>
      <Button buttonText="vote" onClick={handleVotes} />
      <Button
        buttonText="next anecdote"
        onClick={() => setSelected(generateRandomInt(0, anecdotes.length))}
      />
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[getMostVoted()]}</div>
      <br></br>
      <p>votes: {votes[getMostVoted()]}</p>
    </>
  );
};

export default App;
