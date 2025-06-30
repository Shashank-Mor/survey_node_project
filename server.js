const connectDb = require("./config/dbConnection");
const { app } = require("./app");

connectDb();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});