const { convertTimestampToDate } = require("../dist/db/data/seeds/utils")

describe("convertTimestampToDate", () => {
    test("returns a new object", () => {
      const timestamp = 1557572706232;
      const input = { due_date: timestamp };
      const result = convertTimestampToDate(input);
      expect(result).not.toBe(input);
      expect(result).toBeObject();
    });
    test("converts a due_date property to a date", () => {
      const timestamp = 1557572706232;
      const input = { due_date: timestamp };
      const result = convertTimestampToDate(input);
      expect(result.due_date).toBeDate();
      expect(result.due_date).toEqual(new Date(timestamp));
    });
    test("does not mutate the input", () => {
      const timestamp = 1557572706232;
      const input = { due_date: timestamp };
      convertTimestampToDate(input);
      const control = { due_date: timestamp };
      expect(input).toEqual(control);
    });
    test("ignores includes any other key-value-pairs in returned object", () => {
      const input = { due_date: 0, key1: true, key2: 1 };
      const result = convertTimestampToDate(input);
      expect(result.key1).toBe(true);
      expect(result.key2).toBe(1);
    });
    test("returns unchanged object if no due_date property", () => {
      const input = { key: "value" };
      const result = convertTimestampToDate(input);
      const expected = { key: "value" };
      expect(result).toEqual(expected);
    });
  });