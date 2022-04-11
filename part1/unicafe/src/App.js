import { useState } from "react";

const Button = (props) => {
  return (
    <button type="button" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
};

const StatisticLine = (props) => {
  return (
    <p>
      {props.statName} {props.feedbackState}
    </p>
  );
};

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <h1>statistics</h1>
        <StatisticLine statName="good" feedbackState={props.good} />
        <StatisticLine statName="neutral" feedbackState={props.neutral} />
        <StatisticLine statName="bad" feedbackState={props.bad} />
        <StatisticLine
          statName="all"
          feedbackState={props.good + props.neutral + props.bad}
        />
        <StatisticLine
          statName="average"
          feedbackState={
            (props.good * 1 + props.neutral * 0 + props.bad * -1) /
            (props.good + props.neutral + props.bad)
          }
        />
        <StatisticLine
          statName="positive"
          feedbackState={
            (props.good / (props.good + props.neutral + props.bad)) * 100 + " %"
          }
        />
      </>
    );
  }
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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={good + neutral + bad}
      />
    </div>
  );
};

export default App;
