import express from "express";

import router from "./routes/index.js";
import db from "./database/db.database.js";

// import userRoutes from "./routes/user-routes";

const app = express();
const PORT = process.env.PORT || 3000;

await db.sync(db.sequelize, true);

app.use(express.json());
// app.use("/users", userRoutes)
app.get("/", (req, res, next) => {
  res.json({ message: "success" });
});

app.use("/api/users", router.userRoutes);
app.use("/api/carts", router.cartRoutes);
const server = app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});

export default server;
