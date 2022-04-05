import { useState } from "react";

const Button = (props) => {
  return (
    <button type="button" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
};

const StatisticItem = (props) => {
  return (
    <p>
      {props.statName} {props.feedbackState}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        onClick={() => {
          setGood(good + 1);
        }}
        buttonText="good"
      />
      <Button
        onClick={() => {
          setNeutral(neutral + 1);
        }}
        buttonText="neutral"
      />
      <Button
        onClick={() => {
          setBad(bad + 1);
        }}
        buttonText="bad"
      />
      <h1>statistics</h1>
      <StatisticItem statName="good" feedbackState={good} />
      <StatisticItem statName="neutral" feedbackState={neutral} />
      <StatisticItem statName="bad" feedbackState={bad} />
    </div>
  );
};

export default App;
