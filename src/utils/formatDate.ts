export const formatDate = (date: string): string =>
  date.replaceAll("-", "/").slice(0, 10);
