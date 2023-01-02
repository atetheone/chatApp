import request from "supertest";
import app from "../../app";


it('Returns a 201 status on successfull signup', async () => {
  return request(app)
		.post("/api/auth/signup")
		.send({
			email: "toto@toto.com",
			password: "123456",
			name: "Toto tito"
		})
		.expect(201);
});