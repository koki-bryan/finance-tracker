import express from "express";
import pkg from "pg";
import cors from "cors";
import dotenv from "dotenv";
import { authMiddleWare } from "../middleware/auth.js";
import { pool } from "../server.js";

dotenv.config();

const router = express.Router();

router.get("/dashboard", authMiddleWare, async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `
    SELECT 
        COALESCE(SUM(CASE WHEN c.type = 'income'  THEN t.amount ELSE 0 END), 0) AS total_income,
        COALESCE(SUM(CASE WHEN c.type = 'expense' THEN t.amount ELSE 0 END), 0) AS total_expenses,
        COALESCE(SUM(CASE WHEN c.type = 'income'  THEN t.amount ELSE 0 END), 0) - 
        COALESCE(SUM(CASE WHEN c.type = 'expense' THEN t.amount ELSE 0 END), 0) AS total_balance
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1
  `,
      [userId],
    );

    const { total_income, total_expenses, total_balance } = result.rows[0];

    res.status(200).json({
      total_income: parseFloat(total_income) || 0,
      total_expenses: parseFloat(total_expenses) || 0,
      total_balance: parseFloat(total_balance) || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
