export const isBrowser = typeof window !== "undefined";

export const removeCommentsAndSpacing = (str = "") =>
  str.replace(/\/\*.*\*\//g, " ").replace(/\s+/g, " ");
