import "./styles.css";
import { Week } from "../../types/models";
import { Link } from "react-router-dom";
import { empty_cover } from "../../constants";
interface WeekCardProps {
  week: Week;
  topText?: string; // Optional prop for custom range text
}

function WeekCard({ week, topText }: WeekCardProps) {
  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>
        {topText ? topText : week.range}
      </h2>
      <div className="cover-grid">
        {week.data && Array.isArray(week.data) && week.data.length > 0 ? (
          week.data.map((issue, index) => (
            <Link to={`/issue/${issue.issue_id}`} className="link" key={index}>
              <img className="cover" src={issue.cover} alt={issue.title} />
              <p>{issue.title}</p>
            </Link>
          ))
        ) : (
          <div className="cover-item">
            <img
              className="cover"
              src={empty_cover}
              alt="No releases This week"
            />
            <p style={{ textAlign: "center" }}>No releases this week</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeekCard;
