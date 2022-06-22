require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");

morgan.token("body", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

const customMorgan = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    tokens["body"](req, res),
  ].join(" ");
});

app.use(express.static("build"));
app.use(express.json());
app.use(customMorgan);

function generateId(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  response.status(200).send(`<p>Phonebook has info for ${
    persons.length
  } people</p>
    <p>${new Date()}</p>`);
});

// app.get("/api/persons", (request, response) => {
//   response.json(persons);
// });

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
    console.log("rtedsst");
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

// app.post("/api/persons", (request, response) => {
//   const body = request.body;

//   const existingPerson = persons.find((person) => person.name === body.name);

//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: "name or number is missing",
//     });
//   } else if (existingPerson) {
//     return response.status(400).json({
//       error: "name must be unique",
//     });
//   }

//   const person = {
//     id: generateId(1, 10000000000),
//     name: body.name,
//     number: body.number,
//   };

//   persons = persons.concat(person);

//   response.json(person);
// });

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });

  // response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
