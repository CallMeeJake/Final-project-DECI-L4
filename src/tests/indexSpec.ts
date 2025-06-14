import request from "supertest";
import path from "path";
import app from "../index";

describe("POST /upload", () => {
  it("should upload a file successfully", async () => {
    const response = await request(app)
      .post("/upload")
      .attach("resizant", path.resolve("./images/fjord.jpg"));
    expect(response.status).toBe(200);
  });

  it("should respond with error if no file is uploaded", async () => {
    const response = await request(app)
      .post("/upload");
    expect(response.status).toBe(400); 
  });
});

