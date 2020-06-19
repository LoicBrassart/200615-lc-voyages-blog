const express = require("express");
const app = express();

app.use(express.json());

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

app.use("/trips", require("./routes/trips"));

app.listen(3000, () => {
  console.log("API disponible sur http://localhost:3000");
});
