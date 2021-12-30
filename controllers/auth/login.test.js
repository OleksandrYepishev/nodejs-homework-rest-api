const express = require("express");
const request = require("supertest");

const login = require("./login");

const app = express();

app.post("/api/auth/login", login);

describe("test login controller", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  test("status test", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .auth("mail@gmail.com", "123456");
    console.log(response);
  });

  test("login fields test", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .auth("mail@gmail.com", "123456");
    const [users] = response.body;
    expect(typeof users.email).toBe("string");
    expect(typeof users.subscription).toBe("string");
  });
});
