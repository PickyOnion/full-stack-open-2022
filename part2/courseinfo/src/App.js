const Part = (props) => {
  return (
    <p>
      {props.props.name} {props.props.exercises}
    </p>
  );
};

const Content = (props) => {
  return props.props.parts.map((part) => <Part props={part} key={part.id} />);
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
    ],
  };

  return <Course course={course} />;
};

export default App;
