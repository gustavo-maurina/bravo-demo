import postgres from "postgres";

export const sql = postgres({
  host: "localhost",
  port: 54321,
  user: "postgres",
  password: "postgres",
  database: "bravo",
});
