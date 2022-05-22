const Filter = (props) => {
  return (
    <>
      find countries
      <input value={props.value} onChange={props.onChange} />
    </>
  );
};

export default Filter;
