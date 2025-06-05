import axios from "axios";

const URL = "http://127.0.0.1:8000";

const weeksApi = axios.create({
  baseURL: `${URL}/weeks`,
});

export const getAllWeeks = () => weeksApi.get("/");

export const getWeekbyId = (week_id:string) => weeksApi.get(`by-id/${week_id}`);

export const getCurrentWeek = () => weeksApi.get("/current/");

export const getNextWeek = () => weeksApi.get("/next/");

export const getWeeksbyRange = (start:string,end:string) => weeksApi.get(`range/${start}/${end}`)

export const getFilteredWeeks = (titles?: string[]) => 
  weeksApi.get("/filter", { 
    params: { titles },
    paramsSerializer: { indexes: null }
  });

export const getWeeksFromCurrent = () => weeksApi.get("/from-current")



