import axios from "axios";

const URL = "http://127.0.0.1:8000";

const issuesApi = axios.create({
  baseURL: `${URL}/issues`,
});

export const getIssuefromSeries = (series_id:string) => issuesApi.get(`from-series/${series_id}`);

export const getIssuebyId = (issue_id: string) => issuesApi.get(`/by-id/${issue_id}`);

export const getNextIssue = (series_id:string) => issuesApi.get(`next-issue/${series_id}`);

export const getFurthestIssue = (series_id:string) => issuesApi.get(`furthest-issue/${series_id}`);