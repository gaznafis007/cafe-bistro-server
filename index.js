const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

const menuItems = require("./data/menu.json");

app.get("/", (req, res) => {
  res.send("cafe server is running");
});

app.get("/menu", (req, res) => {
  res.send(menuItems);
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
