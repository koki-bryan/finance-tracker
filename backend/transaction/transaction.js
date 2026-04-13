import express from "express";
import dotenv from "dotenv";
import { authMiddleWare } from "../middleware/auth.js";
import { pool } from "../server.js";

dotenv.config();

const router = express.Router();

router.post("/transaction", authMiddleWare, async (req, res) => {
  const userId = req.user.userId;
  const { category, amount, description, date } = req.body;

  if (!category || !amount || !description || !date)
    return res.status(400).json({ error: "Missing fields" });

  const result = await pool.query(
    "INSERT INTO transactions (user_id, category_id, amount, description, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [userId, category, amount, description, date],
  );

  res.json(result.rows[0]);
});

router.get("/transaction", authMiddleWare, async (req, res) => {
  const userId = req.user.userId;

  const result = await pool.query(
    "SELECT * FROM transactions WHERE user_id = $1",
    [userId],
  );
  res.json(result.rows);
});

export default router;
