export const formatFullDate = (date) => {
  if (date) {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    return `${day}/${month}/${year} ${(`00${hours}`).slice(-2)}:${(`00${minutes}`)
      .slice(-2)}:${(`00${seconds}`).slice(-2)}`;
  }
  return;
};