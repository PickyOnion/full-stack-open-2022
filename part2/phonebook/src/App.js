import { useEffect, useState } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./service/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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
        personService.create(numberObject).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        });
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

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to leave?")) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((removedPerson) => removedPerson.id !== id));
      });
    }
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
        <Person
          key={person.id}
          props={person}
          onClick={() => handleDelete(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
