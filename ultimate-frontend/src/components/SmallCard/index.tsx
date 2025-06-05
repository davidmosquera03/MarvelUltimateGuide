import "./styles.css";
import { SeriesPageIssue } from "../../types/models";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatters";
import { extractIssueNumber } from "../../utils/formatters";
interface smallCardProps {
  issue: SeriesPageIssue;
  topText?: string; // Optional prop for custom range text
}

function SmallCard({ issue, topText }: smallCardProps) {
  return (
    <div style={{ alignSelf: "center" }}>
      <h2 style={{ fontSize: "1.5rem" }}>{topText}</h2>
      <div>
        <Link className="link" to={`/issue/${issue.issue_id}`}>
          <img
            className="cover"
            style={{ maxWidth: "20vh" }}
            src={issue.cover}
            alt={issue.title}
          />
          <p>
            <strong>{extractIssueNumber(issue.title)}:</strong>{" "}
            {formatDate(issue.release_date)}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default SmallCard;
