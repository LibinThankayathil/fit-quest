// Load environment variables first — before any other import that reads process.env.
// This must be the very first statement in the application entry point.
import "dotenv/config";

import app from "./app";

const PORT = process.env.PORT ?? "3000";

app.listen(PORT, () => {
  console.log(`FitQuest API running on http://localhost:${PORT}`);
});