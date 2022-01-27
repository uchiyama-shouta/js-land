export const formatDate = (date: string): string =>
  date.replace(/\-/g, "/").slice(0, 10);
