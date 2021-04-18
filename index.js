const express = require("express");
const app = express();
const port = 10000;
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("product"));
app.use(fileUpload());
require("dotenv").config();
console.log(process.env.DB_USER);
///

///////////////
const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://rotorsLuxersCars :ArifulIslamRaju000@cluster0.yaeov.mongodb.net/rotiorsCar?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yaeov.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const ProductsCollection = client.db("rotiorsCar").collection("products");
  const ProductsCollections = client.db("rotiorsCar").collection("product");
  const clientOrderCollections = client
    .db("rotiorsCar")
    .collection("clientOrder");
  const AllOrderCollections = client.db("rotiorsCar").collection("allOrder");
  const reviewsCollections = client.db("rotiorsCar").collection("review");

  app.post("/addEvent", (req, res) => {
    const newEvent = req.body;

    ProductsCollections.insertOne(newEvent).then((result) => {
      console.log(result.insertedCount);
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/ourProduct", (req, res) => {
    ProductsCollections.find().toArray((err, items) => {
      res.send(items);
    });
  });
  ///////////========
  app.post("/addClientOrder", (req, res) => {
    const newEvent = req.body;
    console.log("addClientOrder : ", newEvent);

    clientOrderCollections.insertOne(newEvent).then((result) => {
      console.log("yo mamma", result);
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/clientOrder", (req, res) => {
    console.log(req.query.email);
    clientOrderCollections
      .find({ email: req.query.email })
      .toArray((err, items) => {
        res.send(items);
      });
  });
  //==================//
  app.post("/addAllOrder", (req, res) => {
    const newEvent = req.body;
    console.log("addClientOrder : ", newEvent);

    clientOrderCollections.insertOne(newEvent).then((result) => {
      console.log("yo mamma", result);
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/AllOrder", (req, res) => {
    clientOrderCollections.find().toArray((err, items) => {
      res.send(items);
    });
  });
  //==================//
  app.post("/addPrdReview", (req, res) => {
    const newEvent = req.body;
    // console.log("additing new event : ", newEvent);

    reviewsCollections.insertOne(newEvent).then((result) => {
      console.log("yo mamma", result);
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/orderReviews", (req, res) => {
    reviewsCollections.find().toArray((err, items) => {
      res.send(items);
    });
  });
  ////
  app.post("/isAdmain", (req, res) => {
    const email = req.body.email;
    ProductsCollection.find({ email: email }).toArray((err, doctors) => {
      res.send(doctors.length > 0);
    });
  });
  //=====delete===//
  app.delete("/delete/:id", (req, res) => {
    odersCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        console.log(result);
      });
    console.log(req.params.id);
  });
});
////////////////
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port);
