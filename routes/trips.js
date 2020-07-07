const express = require("express");
const router = express.Router();
const { db } = require("../conf");

router.get("/", (req, res) => {
  let sqlRequest = `SELECT label, price FROM voyage`;

  const { budget } = req.query;
  if (budget) {
    sqlRequest += ` WHERE price<?`;
  }

  db.query(sqlRequest, [budget], (err, results, fields) => {
    if (err) {
      res.status(500).send("Nope, cassé un truc!");
      console.log(err.sql);
      console.log(err.message);
      return;
    }
    if (results.length === 0) {
      res.status(400).send("J'ai rien trouvé!");
      return;
    }
    res.send(results);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT label, price FROM voyage WHERE id=?",
    [id],
    (err, results) => {
      if (err) {
        res.status(500).send("Nope, cassé un truc!");
        console.log(err.sql);
        console.log(err.message);
        return;
      }
      if (results.length === 0) {
        res.status(400).send("J'ai rien trouvé!");
        return;
      }
      res.send(results);
    }
  );
});

router.post("/", (req, res) => {
  req.body.price = parseFloat(req.body.price);
  db.query("INSERT INTO voyage SET ?", [req.body], (err, results) => {
    if (err) {
      res.status(500).send("Nope, cassé un truc!");
      console.log(err.sql);
      console.log(err.message);
      return;
    }
    res.send(results);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM voyage WHERE id=?", [id], (err, results) => {
    if (err) {
      res.status(500).send("Nope, cassé un truc!");
      console.log(err.sql);
      console.log(err.message);
      return;
    }
    res.send(results);
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  db.query("UPDATE voyage SET ? WHERE id=?", [req.body, id], (err, results) => {
    if (err) {
      res.status(500).send("Nope, cassé un truc!");
      console.log(err.sql);
      console.log(err.message);
      return;
    }
    res.send(results);
  });
});

module.exports = router;
