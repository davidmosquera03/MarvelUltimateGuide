import axios from "axios";

const URL = "http://127.0.0.1:8000";

const seriesApi = axios.create({
  baseURL: `${URL}/series`,
});

export const getSeriesTitle = (series_id:string) => seriesApi.get(`/${series_id}`);

export const getSeries = (series_id:string) => seriesApi.get(`/${series_id}`);
//const response = await getSeriesTitle("USM");
export const getSeriesPageIssues = (series_id:string) => seriesApi.get(`/get-issues/${series_id}`);

export const getAllSeries = () => seriesApi.get("/");
