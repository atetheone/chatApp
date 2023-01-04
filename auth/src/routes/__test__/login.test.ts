import request from "supertest";
import app from "../../app";

describe("Login tests", () => {
  it("Fails when receiving a new email for login", async () => {
    request(app)
      .post("api/auth/login")
      .send({
        email: "tota@gmail.com",
        password: "43ERZE"
      })
      .expect(400);
  });
  
  it("Fails when receiving an invalid password", async () => {
    request(app)
      .post("api/auth/signup")
      .send({
        email: "tota@gmail.com",
        password: "43ERZE",
        name: "totot"
      })
      .expect(201);

    request(app)
      .post("api/auth/login")
      .send({
        email: "tota@gmail.com",
        password: "43RZE"
      })
      .expect(400);
  });

  it("Responds with a cookie when given valid credentials", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "tota@gmail.com",
        password: "43ERZE",
        name: "toto"
      })
      .expect(201);

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "tota@gmail.com",
        password: "43ERZE",
      })
      .expect(200);
    
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
