import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js"

//process.env
// dotenv.config({
//   path: "./.env",
// });
dotenv.config();

const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.send("hello world");
// })

// app.get("/instagram", (req, res) => {
//     res.send("this is an instagram page");
// })
// app.listen(port, () => {
//     console.log(`example app listening on port  http://localhost:${port}`);
// })

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`example app listening on port  http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });
