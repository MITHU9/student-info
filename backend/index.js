const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");

dotenv.config();
const app = express();

//E9exOXiP7rO6AMi8
//kmmithu2015

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://student-info-of-pust.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = `${process.env.MONGO_URI}`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    //await client.connect();

    const studentCollection = client.db("students-info").collection("students");

    //42 user data limit
    app.get("/api/students", async (req, res) => {
      const code = req.query.code;

      const codeNumber = parseInt(code);

      const dept = await studentCollection.findOne({
        "Dept.Code": codeNumber,
      });

      //console.log(dept);

      const department = dept.Current_Department;

      const students = await studentCollection
        .find({
          "Dept.Code": codeNumber,
        })
        .toArray();

      res.send({ students, department });
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
