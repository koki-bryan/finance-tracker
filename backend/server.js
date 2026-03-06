import express, { json } from "express";
import pkg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";

const port = 5000;
const app = express();
app.use(express.json());
app.use(cors());

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finance_tracker",
  password: "101906",
  port: 5432,
});

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.send("hello world");
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const router = express.Router();
app.use("/api/v1", router);

router.post("/signup", async (req, res) => {
  const { fullName, email, password, confirmPw } = req.body;
  if (!fullName || !email || !password || !confirmPw) {
    return res.status(400).json({ error: "bad response, missing fields" });
  }

  if (password != confirmPw)
    return res.status(400).json({ error: "mismatch passwords" });

  const pwHash = await bcrypt.hash(password, 13);

  const result = await pool.query(
    "INSERT INTO users (full_name, email, password_hash) VALUES($1, $2, $3) RETURNING *",
    [fullName, email, pwHash],
  );

  res.json(result.rows[0]);
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "bad response, missing fields" });
  }

  const result = await pool.query(
    "SELECT id, email, password_hash FROM users WHERE email=$1",
    [email],
  );
  if (result.rows.length === 0)
    return res.status(401).json({ error: "Invalid Response" });

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    userId: user.id,
  });
});
