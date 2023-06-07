import request from "supertest";
import app from "../../app";

describe("Login tests", () => {
  it("Should fail when receiving an non existing email for login", () => {
    request(app)
      .post("api/auth/login")
      .send({
        email: "tota@gmail.com",
        password: "43ERZE",
      })
      .expect(200)
      .expect({
        error: "CREDENTIALS_INVALID",
        msg: "Email/Password invalid",
      });
    //console.log(loginResponse.body);
  });

  it("Fails when receiving an invalid password", () => {
    request(app)
      .post("api/auth/signup")
      .send({
        email: "tota@gmail.com",
        password: "43ERZE",
        name: "totot",
      })
      .expect(201);

    request(app)
      .post("api/auth/login")
      .send({
        email: "tota@gmail.com",
        password: "43RZE",
      })
      .expect(400)
      .expect({
        error: "CREDENTIALS_INVALID",
        msg: "Email/Password invalid",
      });
  });

  it("Responds with a jwt token and user infos on successful login", () => {
    request(app)
      .post("/api/auth/signup")
      .send({
        email: "tota@gmail.com",
        password: "43ERZE",
        name: "toto",
      })
      .expect(201);

    request(app)
      .post("/api/auth/login")
      .send({
        email: "tota@gmail.com",
        password: "43ERZE",
      })
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty("token");
        expect(response.body.user.name).toEqual("toto");
        expect(response.body.user.email).toEqual("tota@gmail.com");
        expect(response.body.user.id).toBeDefined();
        expect(response.body.user.savedAt).toBeDefined();
        expect(response.body.token).toBeDefined();
      });
  });
});
