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
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const findPerson = persons.find((p) => p.name === numberObject.name);
          console.log("findPerson", findPerson);
          const changedPerson = { ...findPerson, number: newNumber };
          console.log("changedPerson", changedPerson);

          personService
            .update(changedPerson.id, changedPerson)
            .then((returnedPerson) => {
              console.log("returnedPerson", returnedPerson);
              setPersons(
                persons.map((findPerson) =>
                  findPerson.id !== changedPerson.id
                    ? findPerson
                    : returnedPerson
                )
              );
            });
          setNewName("");
          setNewNumber("");
        }
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
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
          onClick={() => handleDelete(person.id, person.name)}
        />
      ))}
    </div>
  );
};

export default App;
