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

const Header = (props) => <h2>{props.props.name}</h2>;

const Course = (course) => {
  return (
    <>
      <Header props={course.course} />
      <Content props={course.course} />
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </>
  );
};

export default App;
