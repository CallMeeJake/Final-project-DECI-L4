# Final project DECI L4 - Web Development
The Final Project for DECI L4 Web Development branch is a simple website with an integrated API For image processing and generation of placeholder images in custom dimensions
# Modules used
This project uses
1. Node.js
2. Multer (For image uploading)
3. Sharp (For image processing)
4. Jasmine (For unit testing)
5. Supertest (For Endpoint testing)
6. Express (To set up API endpoints)
# How to Run?
To run the API's server run 
`$npm run start`
in a **CMD Terminal** directed to the project's directory
# Features
The API has multiple endpoints for multiple features:
1. To upload an image to the storage 
`POST /upload` 

2. To Resize a given image
`GET /resize?filename&width&height`
requires filename, width and height as query parameters

3. To generate a Placeholder Image
`GET /generate?width&height`
requires width and height as query parameters


