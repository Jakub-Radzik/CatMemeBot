import { getTodayAndTomorrow } from "../date";

const mockDate = (isoDate: string) => {
  jest.useFakeTimers().setSystemTime(new Date(isoDate));
};

describe("getTodayAndTomorrow with Month Day format", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return today and tomorrow within the same month", () => {
    mockDate("2025-08-16T12:00:00Z");
    const [today, tomorrow] = getTodayAndTomorrow();
    expect(today).toBe("August 16th");
    expect(tomorrow).toBe("August 17th");
  });

  it("should handle month rollover", () => {
    mockDate("2025-08-31T12:00:00Z");
    const [today, tomorrow] = getTodayAndTomorrow();
    expect(today).toBe("August 31st");
    expect(tomorrow).toBe("September 1st");
  });

  it("should handle year rollover", () => {
    mockDate("2025-12-31T12:00:00Z");
    const [today, tomorrow] = getTodayAndTomorrow();
    expect(today).toBe("December 31st");
    expect(tomorrow).toBe("January 1st");
  });

  it("should handle 2nd, 3rd, and teens correctly", () => {
    mockDate("2025-01-02T12:00:00Z");
    let [today, tomorrow] = getTodayAndTomorrow();
    expect(today).toBe("January 2nd");
    expect(tomorrow).toBe("January 3rd");

    mockDate("2025-01-11T12:00:00Z");
    [today, tomorrow] = getTodayAndTomorrow();
    expect(today).toBe("January 11th");
    expect(tomorrow).toBe("January 12th");
  });
});
