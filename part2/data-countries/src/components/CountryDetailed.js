const CountryDetailed = (props) => {
  console.log(props.props.languages);
  return (
    <>
      <h2>{props.props.name.common}</h2>
      <p>capital:</p>
      {props.props.capital.map((cap) => (
        <li key={cap}>{cap}</li>
      ))}
      <p>area: {props.props.area}</p>
      <p>
        <b>languages:</b>
      </p>
      {Object.values(props.props.languages).map((val) => (
        <li key={val}>{val}</li>
      ))}
      <br></br>
      <img src={props.props.flags.png} alt="flag" width="160" />
    </>
  );
};

export default CountryDetailed;
