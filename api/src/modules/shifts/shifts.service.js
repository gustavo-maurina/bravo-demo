import {
  addDays,
  areIntervalsOverlapping,
  differenceInMinutes,
  format,
  isBefore,
  isSameDay,
} from "date-fns";

import { sql } from "../../db/index.js";
import { composeDateWithTimeString } from "../../utils/functions/composeDateWithTimeString.js";
import { throwError } from "../../utils/functions/throwError.js";

const DEFAULT_OVERLAP_THRESHOLD = 30;

async function getAllWithFacilities() {
  const shifts = await sql`
    SELECT * FROM question_one_shifts qos
    LEFT JOIN facilities f 
      ON qos.facility_id = f.facility_id;
  `;
  return shifts;
}

async function getById(shiftId) {
  const shift = await sql`
    SELECT * FROM question_one_shifts qos
    WHERE qos.shift_id = ${shiftId};
  `;

  if(!shift.length) {
    throwError({
      statusCode: 404,
      message: `Shift with id ${shiftId} not found`,
    })
  }

  return shift[0];
}

async function getOverlapBetweenTwoShifts(shift1Id, shift2Id) {
  const [shift1, shift2] = await Promise.all([
    getById(shift1Id),
    getById(shift2Id),
  ]);

  const result = {
    overlapMinutes: 0,
    maximumOverlapThreshold:
      shift1.facility_id === shift2.facility_id ? DEFAULT_OVERLAP_THRESHOLD : 0,
    exceedsOverlapThreshold: false,
  };

  const start1 = composeDateWithTimeString(shift1.shift_date, shift1.start_time);
  let end1 = composeDateWithTimeString(shift1.shift_date, shift1.end_time);
  if(end1 < start1) {
    end1 = addDays(end1, 1);
  }
   
  const start2 = composeDateWithTimeString(shift2.shift_date, shift2.start_time);
  let end2 = composeDateWithTimeString(shift2.shift_date, shift2.end_time);
  if(end2 < start2) {
    end2 = addDays(end2, 1);
  }

  const hasOverlap = areIntervalsOverlapping(
    { start: start1, end: end1 },
    { start: start2, end: end2 }
  );

  if (hasOverlap) {
    result.overlapMinutes = isBefore(start1, start2)
      ? differenceInMinutes(end1, start2)
      : differenceInMinutes(start1, end2);

    result.overlapMinutes = Math.abs(result.overlapMinutes);
    result.exceedsOverlapThreshold = result.overlapMinutes > result.maximumOverlapThreshold;
  }

  return result;
}

export const shiftsService = {
  getAllWithFacilities,
  getOverlapBetweenTwoShifts,
};
