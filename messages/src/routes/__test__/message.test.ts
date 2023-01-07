import app from "../../app";
import request from "supertest";

describe("Message route handler unit tests", () => {

  it("Returns a 201 on a POST /api/messages/create", async () => {
    const { body } = await request(app)
      .post("/api/messages/create")
      .send({
        by: "atevirran@gmail.com",
        to: "amoula@gmail.com",
        content: "Bonjour ma soeur",
        at: new Date().toISOString()
      })
      .expect(201);
    
  })
});