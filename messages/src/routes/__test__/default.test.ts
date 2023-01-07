import app from "../../app";
import request from "supertest";

describe("Default test", () => {

  it('Returns a json with appName & message properties when going to localhost:3100', async () => {
    const resp = await request(app)
      .get('/')
      .expect(200);

    expect(resp.body.appName).toBe("message_api");
    expect(resp.body.message).toBeDefined();
  })
});