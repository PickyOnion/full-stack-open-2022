const Person = (props) => (
  <p>
    {props.props.name} {props.props.number}
    <button type="button" onClick={props.onClick}>
      delete
    </button>
  </p>
);

export default Person;
