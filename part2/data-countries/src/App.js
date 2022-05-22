import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Country from "./components/Country";
import CountryDetailed from "./components/CountryDetailed";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  function displayQueryFilter(countries) {
    const filteredCountries = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase()) ||
        filter === ""
    );

    if (filteredCountries.length === 1) {
      return <CountryDetailed props={filteredCountries[0]} />;
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      return filteredCountries.map((country) => (
        <Country key={country.name.common} props={country} />
      ));
    }
  }

  return (
    <>
      <input type="text" value={filter} onChange={handleFilterChange} />
      {displayQueryFilter(countries)}
    </>
  );
}

export default App;
