/**
 * Returns true if the value is defined, and returns false, otherwise.
 *
 * @param value Value to check is defined or not.
 * @returns True if the value is defined, and false otherwise.
 */
function isDefined<T>(value: T): boolean {
  return value !== undefined;
}

/**
 * Removes all of the undefined keys within an object.
 *
 * @param initialObject Object to remove all of the undefined keys from.
 * @returns The object without all of the undefined keys.
 *
 * @example
 * // Returns { a: 1 }
 * Utils.cleanObject({ a: 1, b: undefined });
 */
const cleanObject = (
  object: Record<string, unknown>
): Record<string, unknown> => {
  // If the object is falsy, return an empty object.
  if (!object) return {};

  const result: Record<string, unknown> = {};

  // Loop through the [key, value] entries in the object...
  Object.entries(object).forEach(([key, value]: [string, unknown]) => {
    // If the value is defined, then we add it to our result object.
    if (isDefined(value)) result[key] = value;
  });

  return result;
};

const Utils = {
  cleanObject,
  isDefined
};

export default Utils;
