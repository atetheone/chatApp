import request from 'supertest';
import app from '../../app';

describe('Sign out test', () => { 

  it("Clears the cookie after signout", async () => {
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

    const signoutResponse = await request(app)
      .post("/api/auth/signout")
      .send({})
      .expect(200);
    
    expect(signoutResponse.get("Set-Cookie")[0]).toBe("session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly");
  });
  
})