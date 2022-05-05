import { useState } from "react";

const Person = (props) => <p>{props.props.name}</p>;

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const numberObject = {
      name: newName,
    };

    const isDifferentObject = (object1) =>
      JSON.stringify(object1) !== JSON.stringify(numberObject);

    if (newName !== "") {
      if (persons.every(isDifferentObject)) {
        setPersons(persons.concat(numberObject));
        setNewName("");
      } else {
        alert(`${newName} is already added to phonebook`);
        setNewName("");
      }
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.name} props={person} />
      ))}
    </div>
  );
};

export default App;
