import { api } from "./api";

async function getAll() {
  try {
    const response = await api.get("/shifts");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

async function getOverlap(shift1Id, shift2Id) {
  try {
    const response = await api.get("/shifts/overlap", {
      params: { shift1Id, shift2Id },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export const shiftsRequests = {
  getAll,
  getOverlap
};
