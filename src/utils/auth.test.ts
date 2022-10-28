import { API_URL_REGISTER } from "./constsAPI";
import { fetchForm } from "./utils";

describe("Check checkResponse function", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ result: "OK" }),
      ok: true,
    } as any);
  });
  afterEach(() => jest.restoreAllMocks());

  test("Should successfully complete request", async () => {
    const result = await fetchForm(API_URL_REGISTER, {
      email: "email@mail.ru",
      password: "password",
    });
    expect(result).toEqual({ result: "OK" });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("Should fail request", async () => {
    (fetch as any).mockImplementationOnce(() =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue({ result: "NOT OK" }),
        ok: false,
      } as any)
    );
    const result = fetchForm(API_URL_REGISTER, {
      email: "email@mail.ru",
      password: "password",
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    await expect(result).rejects.toEqual({ result: "NOT OK" });
  });
});
