import { useEffect, useState } from "react";
import { getCurrentWeek, getNextWeek } from "../../api/weeks";
import WeekCard from "../../components/WeekCard";
import SeriesCard from "../../components/SeriesCard";
import "./styles.css";
import { Week } from "../../types/models";
import { EMPTY_WEEK } from "../../constants";
function Home() {
  const series_example1 = {
    _id: "USM",
    title: "Ultimate Spider-Man (2024)",
    logo: "https://res.cloudinary.com/du4csald3/image/upload/v1748725919/USM_puxd1y.svg",
    banner:
      "https://res.cloudinary.com/du4csald3/image/upload/v1748747750/USMBanner_a5tfoe.png",
  };

  const series_example2 = {
    _id: "ULT",
    title: "Ultimates (2024)",
    logo: "https://res.cloudinary.com/du4csald3/image/upload/v1748741964/UltimateUniverse_fkjozs.svg",
    banner:
      "https://res.cloudinary.com/du4csald3/image/upload/v1748748031/ULTBanner_ihqfjw.webp",
  };
  const [thisWeek, setThisWeek] = useState<Week>(EMPTY_WEEK);
  const [nextWeek, setNextWeek] = useState<Week>(EMPTY_WEEK);

  async function getThisWeek() {
    const response = await getCurrentWeek();
    setThisWeek(response.data.week);
  }

  async function getNext() {
    const response = await getNextWeek();
    setNextWeek(response.data.week);
  }

  useEffect(() => {
    getThisWeek();
    getNext();
  }, []);

  return (
    <div style={{ display: "flex" }} className="home-responsive">
      <div className="home-layout">
        <WeekCard week={thisWeek} topText="This Week" />
        <WeekCard week={nextWeek} topText="Next Week" />
      </div>
      <div className="series-list">
        <h2 style={{ textAlign: "center" }}> Top series</h2>
        <SeriesCard series={series_example1} />
        <SeriesCard series={series_example2} />
      </div>
    </div>
  );
}

export default Home;
