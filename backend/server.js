import express, { json } from "express";
import pkg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authMiddleWare } from "./middleware/auth.js";
import dashboardRoutes from "./dashboard/dashboard.js";
import transactionRoutes from "./transaction/transaction.js";

dotenv.config();

// CHANGE 1: Use PORT from environment or fallback to 5000
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

// CHANGE 2: Update CORS to allow your Vercel frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://finance-tracker-eight-gules.vercel.app/",
    ],
    credentials: true,
  }),
);

const { Pool } = pkg;

// CHANGE 3: Support both DATABASE_URL (Render) and individual params (local)
export const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      },
);

// CHANGE 4: Listen on 0.0.0.0 for external connections
app.listen(port, "0.0.0.0", () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});

// CHANGE 5: Add health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("hello world");
});

// - - - - - - - - - - - - - - - - SIGNUP- - - - - - - - - - - - - - - - - - -

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

// --------------------------------LOGIN-------------------------------------------
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

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({
    message: "Login successful",
    token: token,
  });
});

router.get("/me", authMiddleWare, (req, res) => {
  res.json({ userId: req.user.userId });
});

app.use("/api/v1", dashboardRoutes);
app.use("/api/v1", transactionRoutes);
