const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(express.json());
app.use(cors());
require("dotenv").config();

const menuItems = require("./data/menu.json");

app.get("/", (req, res) => {
  res.send("cafe server is running");
});

// app.get("/menu", (req, res) => {
//   res.send(menuItems);
// });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qoydxjc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
    const itemCollection = client.db("cafebistrodb").collection("menu");
    app.get("/shortmenu", async (req, res) => {
      const query = {};
      const items = await itemCollection.find(query).limit(3).toArray();
      res.send(items);
    });
    app.get("/menu", async (req, res) => {
      const query = {};
      const items = await itemCollection.find(query).toArray();
      res.send(items);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("server is running on port", port);
});
