import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { shiftsController } from "./modules/shifts/shifts.controller.js";
import { DEFAULT_ERROR_MESSAGE, DEFAULT_ERROR_STATUS_CODE } from "./utils/constants/error.constants.js";
import { queriesController } from "./modules/queries/queries.controller.js";

dotenv.config();
export const app = express();

/* CONFIG */
app.use(cors({ origin: "*" }));

/* ROUTES */
app.use("/shifts", shiftsController);
app.use("/queries", queriesController);


/* ERROR HANDLING */
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode ?? DEFAULT_ERROR_STATUS_CODE).send({ message: err.status ?? DEFAULT_ERROR_MESSAGE });
})

/* START SERVER */
app.listen(process.env.API_PORT, () => {
  console.info(`API is running on port ${process.env.API_PORT}`);
});
