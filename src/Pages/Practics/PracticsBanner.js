import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

const PracticsBanner = ({ date, setDate }) => {
  let footer = <p>Please pick a day.</p>;
  if (date) {
    footer = <p>You picked {format(date, "PP")}.</p>;
  }

  return (
    <div className="hero rounded-3xl border-solid border-2 border-sky-500  bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse ">
        <img
          src="https://api.lorem.space/image/movie?w=260&h=400"
          alt=""
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            footer={footer}
          />
        </div>
      </div>
    </div>
  );
};

export default PracticsBanner;
