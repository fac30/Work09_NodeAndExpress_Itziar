const express = require("express");
const server = express();

// server.get("/", (request, response) => {
//   response.send(<h1>Hello</h1>);
// });

const indexRoute = (request, response) => {
  const time = new Date().toLocaleTimeString();
  console.log(request.get("User-Agent"));
  response.set("x-fake-header", "my-value");
  response.send(`<h1>Hello, it's ${time}</h1>`);
};

server.get("/json", (request, response) => {
  response.send({ message: "Hello" });
});

server.get("/", indexRoute);

server.get("/redirects", (request, response) => {
  response.redirect("/");
});

server.get("/users/:name", (request, response) => {
  const name = request.params.name;
  response.send(`<h1>Hello ${name}</h1>`);
});

server.post("/", (request, response) => {
  console.log("posted");
  response.send("thanks for submitting");
});

server.use((request, response) => {
  response.status(404).send("<h1>Not found</h1>");
});

const PORT = 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
