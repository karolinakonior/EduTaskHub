import { Assignment } from "../test-data/assignments";

export const convertTimestampToDate = ( {due_date, ...otherProperties } : Assignment ) => {
    if (!due_date) return { ...otherProperties };
    return { due_date: new Date(due_date), ...otherProperties };
  };