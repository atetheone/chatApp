import app from "../app";
import request from "supertest";

export const authCookie = async () => {
  const email = "toto@gmail.com";
  const password = "password";
  const name = "toto";

  await request(app)
    .post("/api/auth/signup")
    .send({
      email,
      password,
      name,
    })
    .expect(201);

  const loginResponse = await request(app)
    .post("/api/auth/login")
    .send({
      email,
      password,
    })
    .expect(200);

  const cookie = loginResponse.get("Set-Cookie");

  return cookie;
};
