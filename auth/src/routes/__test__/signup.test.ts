import request from "supertest";
import app from "../../app";

describe("Signup tests", () => {
  it("Returns a 201 status on successfull signup", () => {
    request(app)
      .post("/api/auth/signup")
      .send({
        email: "toto@toto.com",
        password: "123456",
        name: "Toto tito",
      })
      .expect(201);
  });

  it("Returns a 400 with an invalid email", () => {
    request(app)
      .post("/api/auth/signup")
      .send({
        email: "toto.com",
        password: "123456",
        name: "toto",
      })
      .expect(400);
  });

  it("Returns a 400 with an invalid password", () => {
    request(app)
      .post("/api/auth/signup")
      .send({
        email: "toto@mail.com",
        password: "156",
        name: "toto",
      })
      .expect(400);
  });

  it("Returns a 400 with a missing email/password", () => {
    request(app)
      .post("/api/auth/signup")
      .send({
        email: "toto@mail.com",
        name: "toto",
      })
      .expect(400);

    request(app)
      .post("/api/auth/signup")
      .send({
        password: "156",
        name: "toto",
      })
      .expect(400);
  });

  it("Disallows duplicate emails", () => {
    request(app)
      .post("/api/auth/signup")
      .send({
        email: "ate@gmail.com",
        password: "24342R",
        name: "Ate",
      })
      .expect(201);

    request(app)
      .post("/api/auth/signup")
      .send({
        email: "ate@gmail.com",
        password: "2434R",
        name: "Ate",
      })
      .expect(400);
  });
});
