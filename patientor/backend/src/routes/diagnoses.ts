import express from "express";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('get diagnoses');
});

export default router;