export const createDescription = (text: string) => {
  return (
    text.slice(0, 80).replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "") + "..."
  );
};
