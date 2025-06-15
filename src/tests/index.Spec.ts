import request from "supertest";
import path from "path";
import app from "../index";
import sharp from "sharp";

describe('Testing placeholder Generator endpoints', () => {
  it('should get a status of 200 OK for the placehodler endpoint', async () => {
    const response = await request(app).get('/generate?width=300&height=200')
    expect(response.status).toEqual(200)
  })
  it('should return an image with dimensions 300 x 200', async () => {
    const width = 300;
    const height = 200;

    const response = await request(app)
      .get('/generate')
      .query({ width, height })
      .expect('Content-Type', /png/)
      .expect(200);
      
    const imageBuffer = response.body;

    const metadata = await sharp(imageBuffer).metadata();

    expect(metadata.width).toBe(width);
    expect(metadata.height).toBe(height);
  })
})

describe("Testing resize endpoints",() =>{
  it('should get a status of 200 OK', async () => {
    const res = await request(app).get("/resize?filename=fjord&width=300&height=200");
    expect(res.status).toEqual(200)
  })
})
