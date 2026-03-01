import express, { json } from "express";
import pkg from "pg";
import cors from "cors";

const port = 5000;
const app = express();
app.use(express.json());
app.use(cors());
