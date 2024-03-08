import express from "express";
import { shiftsService } from "./shifts.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await shiftsService.getAllWithFacilities();
    res.status(200).json(response);
  } catch(err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get("/overlap", async (req, res, next) => {
  try {
    const shift1Id = req.query?.shift1Id;
    if(!shift1Id) return res.status(400).json({ error: "Query param 'shift1Id' is required" });

    const shift2Id = req.query?.shift2Id;
    if(!shift2Id) return res.status(400).json({ error: "Query param 'shift2Id' is required" });
  
    const response = await shiftsService.getOverlapBetweenTwoShifts(shift1Id, shift2Id);
    res.status(200).json(response);
  } catch(err) {
    next(err)
  }
});

export const shiftsController = router;
