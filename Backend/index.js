let express = require("express");
let cors = require("cors");
require("dotenv").config();
let { connection } = require("./config/db");
let { userRouter } = require("./router/user.routes");
let { notesRouter } = require("./router/notes.routes");
let { authenticate } = require("./middlewares/authenticate.middleware");
let app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.use("/user", userRouter);
app.use(authenticate);
app.use("/notes", notesRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error.message);
  }

  console.log(`Server is running on port ${process.env.port}`);
});
