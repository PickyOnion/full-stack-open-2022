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

export default Course;
