import request from "supertest";
import path from "path";
import app from "../../index";

describe("POST /upload", () => {
    it("should upload a file successfully", async () => {
        const imagePath = path.resolve(__dirname, "../../../images/fjord.jpg");
        console.log("Resolved image path:", imagePath);
  
        const response = await request(app)
            .post("/upload")
            .attach("resizant", imagePath);
        expect(response.status).toBe(200);
    });

    it("should respond with error if no file is uploaded", async () => {
        const response = await request(app)
            .post("/upload");
        expect(response.status).toBe(400); 
    });
});