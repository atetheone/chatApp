import request from "supertest";
import app from "../../app";
import { authCookie } from "../../test/auth-cookie";

describe("current-user route handler test", () => {
  it("Returns the current user", async () => {
    const cookie = await authCookie();

    const currentUserResponse = await request(app)
      .get("/api/auth/currentuser")
      .set("Cookie", cookie)
      .send()
      .expect(200);
  
    expect(currentUserResponse.body.currentUser.email).toEqual("toto@gmail.com");
  
  });

  it("Responds with null if non authenticated", async () => {
    const authResponse = await request(app)
      .get("/api/auth/currentuser")
      .expect(200);
    
    expect(authResponse.body.currentUser).toBeNull();
  });
});
