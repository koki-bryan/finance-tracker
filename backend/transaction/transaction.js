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

//used as a transaction provider, used in recent transactions and PIE CHART(filtered in frontend)
router.get("/transaction", authMiddleWare, async (req, res) => {
  const userId = req.user.userId;

  const result = await pool.query(
    "SELECT * FROM transactions WHERE user_id = $1",
    [userId],
  );
  res.json(result.rows);
});

//income vs expense summary last 6 months
router.get("/transaction/summary", authMiddleWare, async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query(
      "SELECT DATE_TRUNC('month', t.date), c.type, SUM(t.amount) FROM transactions t JOIN categories c ON c.id=t.category_id WHERE t.user_id=$1 AND t.date >= CURRENT_DATE - INTERVAL '6 months' GROUP BY DATE_TRUNC('month', t.date), c.type ORDER BY DATE_TRUNC('month', t.date) ASC, c.type ",
      [userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not Found" });
    }

    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.delete("/transaction/:id", authMiddleWare, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const result = await pool.query(
    "DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, userId],
  );

  res.json(result.rows[0]);
});

router.put("/transaction/:id", authMiddleWare, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  const { category, amount, description, date } = req.body;

  if (!category || !amount || !description || !date)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const result = await pool.query(
      "UPDATE transactions SET category_id = $1, amount = $2, description = $3, date = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
      [category, amount, description, date, id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
