/**
 * Take the duration in milliseconds,
 * converts it to seconds and appends the `s`
 * before returning the string.
 *
 * @export
 * @param {number} timeInMilliseconds
 * @returns {string}
 */
export function setTimingString(timeInMilliseconds) {
  return `${timeInMilliseconds / 1000}s`;
}
