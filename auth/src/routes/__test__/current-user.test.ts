import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";

describe("current-user route handler test", () => {
  it("Should return the current user if authenticated", async () => {
    const user = {
      email: "tota@gmail.com",
      password: "password",
      name: "toto"
    };
    await request(app)
      .post("/api/auth/signup")
      .send(user)
      .expect(201);

    const response = await request(app).post("/api/auth/login").send({
      email: "tota@gmail.com",
      password: "password",
    });
    
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.name).toEqual("toto");
    expect(response.body.user.email).toEqual("tota@gmail.com");

    const token = response.body.token;

    const currentUserResponse = await request(app)
      .get("/api/auth/currentuser")
      .set("Authorization", `Bearer ${token}`);
    console.log(currentUserResponse.body);
    
    expect(currentUserResponse.status).toEqual(200);
    expect(currentUserResponse.body.iat).toBeDefined();
    expect(currentUserResponse.body.email).toEqual(user.email);
    expect(currentUserResponse.body.id).toBeDefined();
  });

});
