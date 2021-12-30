const express = require("express");
const request = require("supertest");

const login = require("./login");

const app = express();

app.post("/api/auth/login", login);

describe("test login controller", () => {
  let server;
  beforeAll(() => (server = app.listen(3001)));
  afterAll(() => server.close());

  test("status test", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .auth("mail@gmail.com", "123456");
    expect(response.status).toBe(200);
  });

  test("login fields test", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .auth("mail@gmail.com", "123456");
    const [user] = response.body;
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
