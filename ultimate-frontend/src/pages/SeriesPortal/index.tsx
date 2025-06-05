import { useEffect, useState } from "react";
import LogoCard from "../../components/LogoCard";
import { Series } from "../../types/models";
import { getAllSeries } from "../../api/series";
import "./styles.css";
getAllSeries;
function SeriesPortal() {
  const [ultSeries, setUltSeries] = useState<Series[]>();

  async function getUltSeries() {
    const response = await getAllSeries();
    setUltSeries(response.data);
  }

  useEffect(() => {
    getUltSeries();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", fontSize: "4vh" }}>Ongoing Series</h2>
      <div className="logo-layout">
        {(ultSeries ?? []).map((series: Series) => (
          <LogoCard
            key={series._id}
            title={series.title ?? ""}
            logo={series.logo ?? ""}
            id={series._id}
          />
        ))}
      </div>
    </div>
  );
}

export default SeriesPortal;
