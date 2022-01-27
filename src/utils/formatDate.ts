import "core-js/features/string/replace-all";
export const formatDate = (date: string): string =>
  date.replaceAll("-", "/").slice(0, 10);
