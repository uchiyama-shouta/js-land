export const formatDate = (date: string): string =>
  date.replaceAll(/\-/g, "/").slice(0, 10);
