const request = require("supertest");
const app = require("../index");

describe("Test auth api", () => {
  it("should return a message of Hello World", async () => {
    const response = await request(app).get("/api");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello world from Auth-API");
  });
});