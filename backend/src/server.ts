import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("FitQuest API running on http://localhost:3000");
});