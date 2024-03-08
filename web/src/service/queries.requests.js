import { api } from "./api";

async function q4() {
  const response = await api.get("/queries/q4");
  return response.data;
}

async function q5() {
  const response = await api.get("/queries/q5");
  return response.data;
}

async function q6() {
  const response= await api.get("/queries/q6");
  return response.data;
}

export const queriesRequests = {
  q4,
  q5,
  q6,
}