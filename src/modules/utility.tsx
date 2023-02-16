/**
 * Calculate and return the time that has passed
 * between a given date and the current time
 * @param date The date to calculate from
 * @returns Human-readable string of time passed
 */
export function timeSince(date: number) {
  const seconds = Math.floor((new Date().getTime() - date) / 1000);
  let result,
    interval = seconds / 31536000;

  if (interval > 1) {
    result = Math.floor(interval);
    return result + ` year${result > 1 ? "s " : " "}ago`;
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    result = Math.floor(interval);
    return result + ` month${result > 1 ? "s " : " "}ago`;
  }

  interval = seconds / 86400;
  if (interval > 1) {
    result = Math.floor(interval);
    return result + ` day${result > 1 ? "s " : " "}ago`;
  }

  interval = seconds / 3600;
  if (interval > 1) {
    result = Math.floor(interval);
    return result + ` hour${result > 1 ? "s " : " "}ago`;
  }

  interval = seconds / 60;
  if (interval > 1) {
    result = Math.floor(interval);
    return result + ` minute${result > 1 ? "s " : " "}ago`;
  }

  result = Math.floor(seconds);
  return result + ` second${result > 1 ? "s " : " "}ago`;
}
