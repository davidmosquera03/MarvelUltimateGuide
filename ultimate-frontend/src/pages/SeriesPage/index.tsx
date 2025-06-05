import { useState, useEffect } from "react";
import { Series, SeriesPageIssues } from "../../types/models";
import { useParams } from "react-router-dom";
import { getSeries } from "../../api/series";
import { getSeriesPageIssues } from "../../api/series";
import { formatDescription } from "../../utils/formatters";
import SmallCard from "../../components/SmallCard";
import { EMPTY_SERIES, EMPTY_SERIES_ISSUE } from "../../constants";
import "./styles.css";

function SeriesPage() {
  const [series, setSeries] = useState<Series>(EMPTY_SERIES);
  const [seriesIssues, setSeriesIssues] =
    useState<SeriesPageIssues>(EMPTY_SERIES_ISSUE);
  const params = useParams();
  const seriesId = params.series_id as string;

  // Combine data fetching into one effect or use a second effect for firstIssue
  useEffect(() => {
    const fetchSeriesAndIssue = async () => {
      try {
        const seriesResponse = await getSeries(seriesId);
        setSeries(seriesResponse.data); // Update series state

        // Now that series is updated, fetch issues
        const issueResponse = await getSeriesPageIssues(
          `${seriesResponse.data._id}`
        );
        setSeriesIssues(issueResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error appropriately, e.g., show an error message
      }
    };

    fetchSeriesAndIssue();
  }, [seriesId]); // Dependency on seriesId so it refetches if the ID changes

  return (
    <div style={{ marginLeft: "2rem" }}>
      <h2>{series.title}</h2>
      <div className="series-layout">
        <img
          style={{ maxWidth: "45vh" }}
          src={series.banner}
          alt={series.title}
        />
        <div>
          <p className="text-box">
            {formatDescription(seriesIssues.first_issue.description)}
          </p>
        </div>
      </div>
      <div className="set-layout">
        <SmallCard issue={seriesIssues.first_issue} topText="First Issue" />
        <SmallCard issue={seriesIssues.next_issue} topText="Next release" />
        <SmallCard
          issue={seriesIssues.furthest_issue}
          topText="Furthest Issue"
        />
      </div>
    </div>
  );
}

export default SeriesPage;
