import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });

dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
.connect(DB_HOST)
.then(() => {
  app.listen(PORT, () => 
    console.log(`Server running. Use our API on port: ${PORT}`);
  );
  console.log("Database connect successful");
  })
  .catch((err) => 
    console.log(`Server not running. Error message: ${err.message}`)

);
