const express = require("express");
const app = express();
const { db } = require("./conf");

app.get("/", (req, res) => {
  res.send("Encore du travail ?");
});

app.get("/hi/:user", (req, res) => {
  const user = req.params.user;
  res.send(`Welcome, ${user}`);
});

app.get("/order", (req, res) => {
  if (req.query.code === "66") {
    res.send(`Aneantissez les Jedi !`);
  } else {
    res.send(`...`);
  }
});

app.get("/trips", (req, res) => {
  db.query("SELECT 1+1", (err, results, fields) => {
    if (err) {
      res.status(500).send("Nope, cassé un truc!");
      console.log(err);
      return;
    }
    if (!results) {
      res.status(400).send("J'ai rien trouvé!");
      return;
    }
    res.send(results);
  });
});

app.listen(3000, () => {
  console.log("API disponible sur http://localhost:3000");
});
