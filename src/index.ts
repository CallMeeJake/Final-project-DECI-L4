import express from "express";
import resize from "../src/utils/resize"
import imageRoutes from "../src/utils/imageRoutes"

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("ts on?")
})

app.use('/resize', resize.routes)
app.use('/upload',imageRoutes)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

export default app;