const Part = (props) => {
  return (
    <p>
      {props.props.name} {props.props.exercises}
    </p>
  );
};

const Content = (props) => {
  const initalValue = 0;
  const exerciseArr = props.props.parts.map((part) => part.exercises);
  const total = exerciseArr.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initalValue
  );

  return (
    <>
      {props.props.parts.map((part) => (
        <Part props={part} key={part.id} />
      ))}
      <p>
        <b>total of {total} exercises</b>
      </p>
    </>
  );
};

const Header = (props) => <h1>{props.props.name}</h1>;

const Course = (course) => {
  console.log(course);
  return (
    <>
      <Header props={course.course} />
      <Content props={course.course} />
    </>
  );
};

// const Total = props => {
//   return (

//   )
// }

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
