import { Issue } from "../../types/models";
import { useEffect, useState } from "react";
import { getIssuebyId } from "../../api/issues";
import { useParams } from "react-router-dom";
import IssueNavigation from "../../components/IssueNavigation";
import { formatDate, formatDescription } from "../../utils/formatters";
import { Link } from "react-router-dom";
import "./styles.css";
import { EMPTY_ISSUE } from "../../constants";

function IssuePage() {
  const [comicIssue, setcomicIssue] = useState<Issue>(EMPTY_ISSUE);
  const params = useParams();
  const issueId = params.issue_id as string;

  async function getcomicIssue() {
    const response = await getIssuebyId(issueId);
    setcomicIssue(response.data.issue);
  }
  useEffect(() => {
    getcomicIssue();
  }, [issueId]);

  return (
    <div style={{ marginLeft: "2rem" }}>
      <h2>{comicIssue.title}</h2>
      <div className="issue-layout" style={{ display: "flex", gap: "2rem" }}>
        <div>
          <a href={comicIssue.cover} target="_blank">
            <img style={{ maxWidth: "32vh" }} src={comicIssue.cover} />
          </a>
          <p>
            <strong>Release Date:</strong> {formatDate(comicIssue.release_date)}{" "}
          </p>
          <Link
            style={{
              fontWeight: "bold",
              color: "#161a1d",
            }}
            to={`/series/${comicIssue.series_id}`}
          >
            <p>See Series</p>
          </Link>
          <IssueNavigation
            series_id={comicIssue.series_id}
            issue_number={comicIssue.issue_number}
          />
        </div>
        <div>
          <p className="text-box">
            {formatDescription(comicIssue.description)}
          </p>

          {comicIssue.creators.map((creator, index) => (
            <p key={index}>
              <strong style={{ textTransform: "capitalize" }}>
                {creator.role}
              </strong>
              : {creator.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IssuePage;
