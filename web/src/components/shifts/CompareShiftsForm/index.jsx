import { useState } from "react";
import "./index.css";
import PropTypes from "prop-types";
import { shiftsRequests } from "../../../service/shift.requests";

export const CompareShiftsForm = ({ selectedShifts }) => {
  const [overlapData, setOverlapData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedShifts.length !== 2) {
      return;
    }

    try {
      const response = await shiftsRequests.getOverlap(
        selectedShifts[0].shift_id,
        selectedShifts[1].shift_id
      );
      setOverlapData(response);
    } catch (err) {
      alert("Error submitting form");
    }
  };

  return (
    <form className="compare-shifts-form-container" onSubmit={handleSubmit}>
      <div>
        <p>Overlap Minutes: {overlapData?.overlapMinutes ?? ""}</p>
        <p>Max Overlap Threshold: {overlapData?.maximumOverlapThreshold ?? ""}</p>
        <p>
          Exceeds Overlap Threshold:  
          {overlapData?.exceedsOverlapThreshold ? " True": " False"}
        </p>
      </div>
      <button
        type="submit"
        className="button"
        data-disabled={selectedShifts?.length !== 2}
      >
        Submit
      </button>
    </form>
  );
};

CompareShiftsForm.propTypes = {
  selectedShifts: PropTypes.arrayOf(
    PropTypes.shape({
      shift_id: PropTypes.number.isRequired,
      facility_id: PropTypes.number.isRequired,
      shift_date: PropTypes.string.isRequired,
      start_time: PropTypes.string.isRequired,
      end_time: PropTypes.string.isRequired,
      facility_name: PropTypes.string.isRequired,
    })
  ),
};
