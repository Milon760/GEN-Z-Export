const app = require("./app");
const connectDB = require("./config/db");
const { serverPort } = require("./secret");

app.listen(serverPort, async () => {
  console.log(`server is running at http://localhost:${serverPort}`);
  try {
    await connectDB();
  } catch (error) {
    console.error("Database Connection Failed", error.message);
  }
});
