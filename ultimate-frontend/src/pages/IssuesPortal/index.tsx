import { useEffect, useState } from "react";
import { getOverview } from "../../api/issues";
import { useParams } from "react-router-dom";
import { WeekIssue } from "../../types/models";
import BasicCard from "../../components/BasicCard";
import "./styles.css";
import { getSeriesLength } from "../../api/series";
function IssuesPortal() {
  const [issues, setIssues] = useState<WeekIssue[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalIssues, setTotalIssues] = useState(0);
  const params = useParams();
  const seriesId = params.series_id as string;
  const pageSize = 12;
  const fetchIssues = async (pageNum: number) => {
    setLoading(true);
    // API call to get issues
    const response = await getOverview(seriesId, pageNum, pageSize);
    // Append new issues to existing array
    // With this:
    if (pageNum === 1) {
      setIssues(response.data.issues);
    } else {
      setIssues((prev) => [...prev, ...response.data.issues]);
    }
    setLoading(false);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
    fetchIssues(page + 1);
  };

  async function getLength() {
    const response = await getSeriesLength(seriesId);
    setTotalIssues(response.data);
  }
  useEffect(() => {
    // get num of issues
    getLength();
    // get first page of issues
    fetchIssues(1);
  }, []);

  const hasMore = page * pageSize < totalIssues;
  return (
    <div>
      <div className="portal-grid">
        {Array.isArray(issues) && issues.length > 0 ? (
          issues.map((issue) => (
            <BasicCard key={issue.issue_id} issue={issue} />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No issues available</p>
        )}
      </div>
      {hasMore ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <button className="button" onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default IssuesPortal;
