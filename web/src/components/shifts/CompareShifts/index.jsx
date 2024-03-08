import { useEffect, useState } from "react";
import { shiftsRequests } from "../../../service/shift.requests";
import { ShiftCard } from "../ShiftCard";
import "./index.css";
import { CompareShiftsForm } from "../CompareShiftsForm";

export const CompareShifts = () => {
  const [shifts, setShifts] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getShifts = async () => {
      const shifts = await shiftsRequests.getAll();
      if (isMounted) {
        setShifts(shifts);
      }
    };
    getShifts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleShiftClick = (shift) => {
    const isSelected = selectedShifts.some(
      ({ shift_id }) => shift.shift_id === shift_id
    );
    
    if(isSelected) {
      return setSelectedShifts(selectedShifts.filter(({ shift_id }) => shift.shift_id !== shift_id))
    } else if(selectedShifts.length === 2) {
      return;
    }

    return setSelectedShifts([...selectedShifts, shift])
  };

  return (
    <div>
    <CompareShiftsForm selectedShifts={selectedShifts} />

    <div className="shifts-container">
      {shifts.map((shift) => {
        const isSelected = selectedShifts.some(
          (s) => shift.shift_id === s.shift_id
        );

        return (
          <ShiftCard
            key={shift.shift_id}
            shift={shift}
            onClick={() => handleShiftClick(shift)}
            data-selectable={selectedShifts.length < 2 || isSelected}
            data-selected={isSelected}
          />
        )
      })}
    </div>
    </div>
  );
};
