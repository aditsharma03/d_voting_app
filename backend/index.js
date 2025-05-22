require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/auth");

const PORT = process.env.PORT;



const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));



app.get( "/checkhealth", (req,res) => {
  res.send("App is in good health!");
} )
app.post( "/checkhealth", (req,res) => {
  res.send(req.body);
} )


app.use( "/auth", router )



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to mongoDB"))
  .catch( (err) => console.log(err) );

app.listen(PORT, () => {
  console.log(`Started listening on port: ${PORT}`);
});
