import { useState } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-12345667" },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();

    const numberObject = {
      name: newName,
      number: newNumber,
    };

    const isDifferentObject = (object1) =>
      JSON.stringify(object1.name) !== JSON.stringify(numberObject.name);

    if (newName !== "" && newNumber !== "") {
      if (persons.every(isDifferentObject)) {
        setPersons(persons.concat(numberObject));
        setNewName("");
        setNewNumber("");
      } else {
        alert(`${newName} is already added to phonebook`);
        setNewName("");
        setNewNumber("");
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Add new contact</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.name} props={person} />
      ))}
    </div>
  );
};

export default App;
