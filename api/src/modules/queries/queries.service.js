import { sql } from "../../db/index.js";

async function getQ4() {
  const q4 = await sql`
      SELECT  
      j.facility_id,
      j.nurse_type_needed,	
      (SUM(j.total_number_nurses_needed) - (
        SELECT query2.count FROM (
          SELECT 
            facility_id, nurse_type, count(*)
          FROM 
            nurse_hired_jobs nhj
          LEFT JOIN
            nurses n ON n.nurse_id = nhj.nurse_id
          LEFT JOIN
            jobs j2 ON j2.job_id = nhj.job_id
          WHERE 
            j.nurse_type_needed = n.nurse_type AND j.facility_id = j2.facility_id
          GROUP BY facility_id, nurse_type
        ) AS query2
      )) AS remaining_spots
    FROM jobs j
    GROUP BY j.facility_id, j.nurse_type_needed
    ORDER BY facility_id ASC, nurse_type_needed ASC;
  `;

  return q4;
}

async function getQ5() {
  const q5 = await sql`
    SELECT nurse_id, nurse_name, nurse_type, (
      SELECT query1.count
      FROM (
        SELECT count(*)
        FROM (
          SELECT j.job_id, count(*), total_number_nurses_needed
          FROM jobs j
          WHERE j.nurse_type_needed = n.nurse_type AND (
            SELECT count(*) FROM nurse_hired_jobs nhj
            WHERE nhj.job_id = j.job_id
            GROUP BY job_id
          ) < total_number_nurses_needed AND n.nurse_id NOT IN (
              SELECT nurse_id FROM nurse_hired_jobs nhj2 WHERE nhj2.job_id = j.job_id
              AND nurse_id NOT IN (
                SELECT nurse_id FROM nurse_hired_jobs nhj3
                WHERE nhj3.job_id = j.job_id
                GROUP BY job_id, nurse_id 
                HAVING count(*) >= total_number_nurses_needed
              )
            )
          GROUP BY j.nurse_type_needed, j.job_id
        ) AS query2
      ) AS query1) AS available_jobs
    FROM nurses n
    ORDER BY n.nurse_id asc;
  `;

  return q5;
}

async function getQ6() {
  const q6 = await sql`
    SELECT j.job_id, j.facility_id, j.nurse_type_needed, (
      SELECT n2.nurse_id
      FROM nurse_hired_jobs nhj
      LEFT JOIN nurses n2 ON n2.nurse_id = nhj.nurse_id 
      WHERE n2.nurse_id NOT IN (SELECT nurse_id FROM nurse_hired_jobs nhj3 WHERE job_id = j.job_id)
      AND n2.nurse_type = j.nurse_type_needed
      GROUP BY n2.nurse_name, n2.nurse_id  
      ORDER BY COALESCE((
        SELECT count(*) FROM nurse_hired_jobs nhj2
        LEFT JOIN jobs j2 ON j2.job_id = nhj2.job_id 
        WHERE n2.nurse_id = nhj2.nurse_id AND j2.facility_id = j.facility_id 
        GROUP BY nurse_id
      ), 0) DESC, count(*) DESC, n2.nurse_id ASC
      LIMIT 1
    ) AS nurse_id
    FROM jobs j
    INNER JOIN nurses n ON n.nurse_type = j.nurse_type_needed
    WHERE job_id NOT IN (
      SELECT job_id FROM nurse_hired_jobs nhj 
      GROUP BY job_id HAVING count(*) >= j.total_number_nurses_needed 
    )  
    GROUP BY j.job_id, j.facility_id
    ORDER BY job_id DESC;
  `;

  return q6;
}

export const queriesService = {
  getQ4,
  getQ5,
  getQ6,
};
