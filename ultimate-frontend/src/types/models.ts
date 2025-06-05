export interface Week {
    data: WeekIssue[];
    date_end: string;
    date_start: string;
    range: string;
    week_no: number;
    year: number;
    [property: string]: any;
}

export type WeekReleases = Week[]


export interface WeekIssue {
    issue_id: string //Issue from a Week 
    cover: string;
    title: string;
}

export interface SeriesPageIssue{
    issue_id: string //Issue from a Week 
    cover: string;
    title: string;
    description: string;
    release_date: string;
}

export interface Issue {
    _id: string
    cover: string;
    creators: Creator[];
    description: string;
    issue_number: number;
    release_date: string;
    series_id: string;
    title: string;
    [property: string]: any;
}

export interface Creator {
    name: string;
    role: string;
}

export interface Series {
    _id : string
    banner?: string;
    logo: string;
    title?: string; // Optional property
    [property: string]: any;
}

export interface SeriesPageIssues { // from route 
  first_issue: SeriesPageIssue;
  next_issue: SeriesPageIssue;
  furthest_issue: SeriesPageIssue;
}

