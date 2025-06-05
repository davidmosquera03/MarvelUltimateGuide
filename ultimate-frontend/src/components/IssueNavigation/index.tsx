import { Link } from "react-router-dom";
import "./styles.css";
interface IssueNavigationProps {
  series_id: string;
  issue_number: number;
  max_issue_number: number;
}

function IssueNavigation({
  series_id,
  issue_number,
  max_issue_number,
}: IssueNavigationProps) {
  return (
    <div className="issue-nav" style={{ display: "flex", gap: "1rem" }}>
      {issue_number != 1 && issue_number != 0 ? (
        <Link to={`/issue/${series_id}-${issue_number - 1}`}>
          <h3>Prev.</h3>
        </Link>
      ) : (
        <></>
      )}
      {issue_number < max_issue_number ? (
        <Link to={`/issue/${series_id}-${issue_number + 1}`}>
          <h3>Next.</h3>
        </Link>
      ) : null}
    </div>
  );
}

export default IssueNavigation;
