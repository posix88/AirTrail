export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

export const pluralize = (count: number, singular: string, plural?: string) => {
  return count === 1 ? singular : (plural ?? `${singular}s`);
};
