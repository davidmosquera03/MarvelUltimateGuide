import { Issue } from "../../types/models";
import { useEffect, useState } from "react";
import { getIssuebyId } from "../../api/issues";
import IssueNavigation from "../../components/IssueNavigation";
import { formatDate, formatDescription } from "../../utils/formatters";
import { Link } from "react-router-dom";
import "./styles.css";
import { EMPTY_ISSUE } from "../../constants";

type IssuePageProps = {
  issueId: string;
  maxIssueNumber: number;
};

function IssuePage({ issueId, maxIssueNumber }: IssuePageProps) {
  const [comicIssue, setComicIssue] = useState<Issue>(EMPTY_ISSUE);

  useEffect(() => {
    async function getComicIssue() {
      const res = await getIssuebyId(issueId);
      setComicIssue(res.data.issue);
    }
    getComicIssue();
  }, [issueId]);
  return (
    <div style={{ marginLeft: "2rem" }}>
      <h2>{comicIssue.title}</h2>
      <div className="issue-layout" style={{ display: "flex", gap: "2rem" }}>
        <div>
          <a href={comicIssue.cover} target="_blank">
            <img
              style={{ maxWidth: "32vh" }}
              src={comicIssue.cover}
              alt={comicIssue.title}
            />
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
            max_issue_number={maxIssueNumber}
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
