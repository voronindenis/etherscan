export const joinPath = (parts: string[], sep = '/'): string => {
  const replace = new RegExp(`${sep}{1,}`, 'g');

  return parts.join(sep).replace(replace, sep);
};
