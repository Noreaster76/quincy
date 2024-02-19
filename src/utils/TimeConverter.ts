/**
 * Parses a duration string in either hh:mm:ss format or seconds into seconds.
 * @param {string | number} duration - The duration in hh:mm:ss format or as an integer string/number.
 * @returns {number} - The duration in seconds.
 */
export function parseDuration(duration: string | number): number {
  // If duration is already a number, return it directly.
  if (typeof duration === "number") {
    return duration;
  }

  // Check if duration is in hh:mm:ss format
  if (typeof duration === "string" && duration.includes(":")) {
    const parts = duration.split(":").map((part) => parseInt(part, 10));
    let seconds = 0;
    if (parts.length === 3) {
      // hh:mm:ss
      seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      // mm:ss
      seconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
      // ss
      seconds = parts[0];
    }
    return seconds;
  }

  // If duration is a string representing an integer, parse it as a number
  return parseInt(duration, 10);
}
