export function isBlurry(value) {
  return (
    value == null ||
    (typeof value == 'string' && value === '') ||
    (typeof value == 'number' && value === 0)
  );
}
