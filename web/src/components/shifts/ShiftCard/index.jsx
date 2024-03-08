import PropTypes from "prop-types";
import "./index.css";
import { timeString24To12Format } from "../../../utils/functions/timeString24To12Format";

export const ShiftCard = ({ shift, ...rest }) => {
  const shiftDate = new Date(shift.shift_date);

  const getDateNumberFormatted = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  return (
    <button className="shift-card" type="button" {...rest}>
      <p>{shift.facility_name}</p>
      <p>{`${shiftDate.getFullYear()}-${getDateNumberFormatted(
        shiftDate.getMonth() + 1
      )}-${getDateNumberFormatted(shiftDate.getDate())}`}</p>
      <p>
        {timeString24To12Format(shift.start_time)}
        {" - "}
        {timeString24To12Format(shift.end_time)}
      </p>
    </button>
  );
};

ShiftCard.propTypes = {
  shift: PropTypes.shape({
    shift_id: PropTypes.number.isRequired,
    facility_id: PropTypes.number.isRequired,
    shift_date: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    facility_name: PropTypes.string.isRequired,
  }),
};
