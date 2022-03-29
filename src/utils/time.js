const getTimeElapsed = (time) => {
  const date = new Date();
  const elapsed = date.getTime() - time;
  if (elapsed < 60000) {
    return `${Math.floor(elapsed / 1000)}s`;
  }
  if (elapsed < 3600000) {
    return `${Math.floor(elapsed / 60000)}m`;
  }
  if (elapsed < 216000000) {
    return `${Math.floor(elapsed / 3600000)}h`;
  }
  return `${Math.floor(elapsed / 86400000)}d`;
};

export default getTimeElapsed;
