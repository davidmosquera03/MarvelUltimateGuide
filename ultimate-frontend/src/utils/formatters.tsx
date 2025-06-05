// src/utils/formatters.tsx
import { JSX } from "react";
export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const formatDescription = (
  description: string
): JSX.Element | string => {
  const match = description.match(/^(.+?[!?]+)(?:\s|$)/);

  if (match) {
    const boldPart = match[1];
    const rest = description.substring(match[0].length);
    return (
      <>
        <strong>{boldPart}</strong>
        <br />
        {rest}
      </>
    );
  }

  return description;
};

export function extractIssueNumber(str: string): string | null {
  const match = str.match(/#\d+/);
  return match ? match[0] : null;
}
