import { checkResponse } from "utils/utils";

describe("Check checkResponse function", () => {
  test("Shoud return successful respose", () => {
    const testResponse = {
      ok: true,
      json: () => {
        return { result: "OK" };
      },
    } as any;
    const result = checkResponse(testResponse);
    expect(result).toEqual({ result: "OK" });
  });

  test("Shoud return response error", async () => {
    const testResponse = {
      ok: false,
      json: async () => {
        return { result: "error" };
      },
    } as any;
    const result = checkResponse(testResponse);
    await expect(result).rejects.toEqual({ result: "error" });
  });
});
