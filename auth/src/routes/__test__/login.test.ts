import request from "supertest";
import app from "../../app";

describe("Login tests", () => {
  it("Fails when receiving an non existing email for login", async () => {
    const loginResponse = await request(app).post("api/auth/login").send({
      email: "tota@gmail.com",
      password: "43ERZE",
    });

    expect(loginResponse.status).toEqual(400);
    expect(loginResponse.body).toEqual({
      error: "CREDENTIALS_INVALID",
      msg: "Email/Password invalid",
    });
  });

  it("Fails when receiving an invalid password", async () => {
    request(app)
      .post("api/auth/signup")
      .send({
        email: "tota@gmail.com",
        password: "43ERZE",
        name: "totot",
      })
      .expect(201);

    const loginResponse = await request(app).post("api/auth/login").send({
      email: "tota@gmail.com",
      password: "43RZE",
    });

    expect(loginResponse.status).toEqual(400);
    expect(loginResponse.body).toEqual({
      error: "CREDENTIALS_INVALID",
      msg: "Email/Password invalid",
    });
  });

  it("Responds with a jwt token and user infos on successful login", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "tota@gmail.com",
        password: "43ERZE",
        name: "toto",
      })
      .expect(201);

    const response = await request(app).post("/api/auth/login").send({
      email: "tota@gmail.com",
      password: "43ERZE",
    });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.name).toEqual("toto");
    expect(response.body.user.email).toEqual("tota@gmail.com");
    expect(response.body.user.id).toBeDefined();
    expect(response.body.savedAt).toBeDefined();
  });
});
