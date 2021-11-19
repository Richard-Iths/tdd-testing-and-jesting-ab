import express from "express";
import router from "./routes/user-routes"
import db from "./database/db.database"
// import userRoutes from "./routes/user-routes";

const app = express();
const PORT = process.env.PORT || 3000;

await db.sync(db.sequelize, false);

app.use(express.json());
// app.use("/users", userRoutes)
app.get("/", (req, res, next) => {
  res.json({ message: "success" });
});

app.use("/api", router)
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});

export default app