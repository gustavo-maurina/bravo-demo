import express from "express";
import { queriesService } from "./queries.service.js";

const router = express.Router();

router.get("/q4", async (req, res) => {
  try {
    const response = await queriesService.getQ4();
    res.status(200).json(response);
  } catch(err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get("/q5", async (req, res) => {
  try {
    const response = await queriesService.getQ5();
    res.status(200).json(response);
  } catch(err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get("/q6", async (req, res) => {
  try {
    const response = await queriesService.getQ6();
    res.status(200).json(response);
  } catch(err) {
    res.status(500).json({ error: err?.message });
  }
});

export const queriesController = router;