import { WeekReleases, Week, Issue, SeriesPageIssues} from "../types/models";  
  

export const empty_cover =
    "https://res.cloudinary.com/du4csald3/image/upload/v1748883280/ultimate_placeholder_lh9rjn.jpg";


export const EMPTY_WEEK: Week = {
    data: [],
    date_end: "", // Or a default empty string
    date_start: "", // Or a default empty string
    range: "No data...", // Or "No data available"
    week_no: 0,
    year: 0,
  };


export const EMPTY_WEEK_RELEASES: WeekReleases = [
    EMPTY_WEEK
  ];

export const EMPTY_ISSUE: Issue = {
    _id: "None",
    title: "404: Issue Not Found",
    issue_number: 0,
    series_id: "None",
    release_date: "2025-07-16",
    cover:
      empty_cover,
    description: "NO Issue Found",
    creators: [],
  };

export const EMPTY_SERIES = {
    _id: "",
    title: "404 Series Not Found",
    logo: "",
    banner: undefined,
  };

export const EMPTY_SERIES_ISSUE: SeriesPageIssues = {
    first_issue: {
      issue_id: "",
      title: "Ultimate Title",
      cover: empty_cover,
      description: "no description",
      release_date: "0000-00-00",
    },
    next_issue: {
      issue_id: "",
      title: "Ultimate Title",
      cover: empty_cover,
      description: "no description",
      release_date: "0000-00-00",
    },
    furthest_issue: {
      issue_id: "",
      title: "Ultimate Title",
      cover: empty_cover,
      description: "no description",
      release_date: "0000-00-00",
    },
  };
