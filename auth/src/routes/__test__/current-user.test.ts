import request from "supertest";
import app from "../../app";

describe("current-user route handler test", () => {
  it("Should return the current user if authenticated", () => {
    const user = {
      email: "tota@gmail.com",
      password: "password",
      name: "toto"
    };

    request(app)
      .post("/api/auth/signup")
      .send(user)
      .expect(201)
      .expect((response) => {
        expect(response.body.email).toEqual(user.email);
        expect(response.body.name).toEqual(user.name);
      });

    let token = "";
    request(app).post("/api/auth/login").send({
      email: "tota@gmail.com",
      password: "password",
    }).expect(200)
    .expect((response) => {
      expect(response.body).toHaveProperty("token");
      expect(response.body.user.name).toEqual("toto");
      expect(response.body.user.email).toEqual("tota@gmail.com");
      token = response.body.token;
    });
    

    request(app)
      .get("/api/auth/currentuser")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("iat");
        expect(response.body.email).toEqual(user.email);
      });
    
  });

});
