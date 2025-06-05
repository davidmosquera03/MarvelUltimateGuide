import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import IssuePage from "../../components/IssuePage";
import { getSeriesLength } from "../../api/series";

export default function IssueLayout() {
  /* This page acts as parent component for IssuePage
  in order to handle removing Next button when loading last issue.
  IssueLayout gets maxIssueNumber and only calls more then series_id changes

  so IssuePage no longer needs params
*/
  const { issue_id } = useParams();
  // helps prevent navigation on last issue
  const [maxIssueNumber, setMaxIssueNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  // from param get seriesId
  const [seriesId] = issue_id?.split("-") ?? [];

  useEffect(() => {
    async function fetchMax() {
      setLoading(true);
      const res = await getSeriesLength(seriesId);
      setMaxIssueNumber(res.data);
      setLoading(false);
    }

    if (seriesId && maxIssueNumber === null) {
      fetchMax();
    }
  }, [seriesId, maxIssueNumber]);

  if (loading || !issue_id) return <div>Loading...</div>;

  return <IssuePage issueId={issue_id} maxIssueNumber={maxIssueNumber!} />;
}
