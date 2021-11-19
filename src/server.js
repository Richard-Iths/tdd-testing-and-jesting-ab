import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

await db.sync(db.sequelize, false);

app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ message: "success" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
