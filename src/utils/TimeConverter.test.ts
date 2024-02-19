import { parseDuration } from './TimeConverter';

describe("parseDuration", () => {
  test("correctly parses hh:mm:ss format to seconds", () => {
    expect(parseDuration("01:01:01")).toBe(3661);
  });

  test("correctly parses mm:ss format to seconds", () => {
    expect(parseDuration("01:01")).toBe(61);
  });

  test("treats a single number string as seconds", () => {
    expect(parseDuration("61")).toBe(61);
  });

  test("returns the input if it is already a number", () => {
    expect(parseDuration(61)).toBe(61);
  });
});
