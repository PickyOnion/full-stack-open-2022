import CountryDetailed from "./CountryDetailed";

function Country(props) {
  return (
    <li>
      {props.props.name.common}
      <button type="button" onClick={props.onClick}>
        show
      </button>
    </li>
  );
}

export default Country;
