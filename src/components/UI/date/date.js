import moment from "moment-jalaali";

const CurrentDate = (props) => {
  const date = props.date || new Date();
  const day = moment(date).format("ddd jDD jMMMM jYYYY");
  return day;
};

export default CurrentDate;
