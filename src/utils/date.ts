export const parseDate = (dateStr: string): Date => {
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-based.
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date();
};
