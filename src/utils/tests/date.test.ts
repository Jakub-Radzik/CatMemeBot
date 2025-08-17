import { getTodayAndTomorrow, isSunday, isWednesday } from "../date";

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

describe("isWednesday", () => {
  it("zwraca true dla środy", () => {
    const wednesday = new Date("2025-08-13");
    expect(isWednesday(wednesday)).toBe(true);
  });

  it("zwraca false dla innych dni", () => {
    const monday = new Date("2025-08-18"); // Poniedziałek
    expect(isWednesday(monday)).toBe(false);
  });
});

describe("isSunday", () => {
  it("zwraca true dla niedzieli", () => {
    const sunday = new Date("2025-08-17"); // Niedziela
    expect(isSunday(sunday)).toBe(true);
  });

  it("zwraca false dla innych dni", () => {
    const friday = new Date("2025-08-15"); // Piątek
    expect(isSunday(friday)).toBe(false);
  });
});
