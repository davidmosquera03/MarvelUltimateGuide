import { WeekIssue } from "../../types/models";
import { Link } from "react-router-dom";
interface basicCardProps {
  issue: WeekIssue;
}

function BasicCard({ issue }: basicCardProps) {
  return (
    <div style={{ alignSelf: "center" }}>
      <div>
        <Link className="link" to={`/issue/${issue.issue_id}`}>
          <img
            className="cover"
            style={{ maxWidth: "22vh" }}
            src={issue.cover}
            alt="No Issue available"
          />
          <p style={{ marginTop: "0" }}>{issue.title}</p>
        </Link>
      </div>
    </div>
  );
}

export default BasicCard;
