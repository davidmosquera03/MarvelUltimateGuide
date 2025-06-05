import WeekCard from "../../components/WeekCard";
import "./styles.css";
import { Week, WeekReleases } from "../../types/models";
import { useState, useEffect } from "react";
import { getAllWeeks, getWeeksFromCurrent } from "../../api/weeks";
import { EMPTY_WEEK_RELEASES } from "../../constants";
function Calendar() {
  const [WeekReleases, setWeekReleases] =
    useState<WeekReleases>(EMPTY_WEEK_RELEASES);
  const [fromCurrent, setFromCurrent] = useState<boolean>(true);

  const toggleText = fromCurrent
    ? "Include Past Weeks"
    : "Start From current week";

  async function getWeekReleases() {
    const response = fromCurrent
      ? await getWeeksFromCurrent()
      : await getAllWeeks();
    setWeekReleases(response.data.weeks);
  }

  useEffect(() => {
    getWeekReleases();
  }, [fromCurrent]);

  return (
    <div>
      <div style={{ marginTop: "1rem", marginLeft: "1.5rem" }}>
        <button
          className="button"
          onClick={() => {
            setFromCurrent(!fromCurrent);
          }}
        >
          {toggleText}
        </button>
      </div>

      <div className="calendar-layout">
        {WeekReleases.map((week: Week) => (
          <WeekCard week={week} key={week.week_no} />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
