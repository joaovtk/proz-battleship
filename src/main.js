import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.static("src/pages/static"));

app.get("/", (req, res) => {
    res.sendFile("src/pages/index.html", {root: "."});
});

app.listen(process.env.PORT, process.env.LOCALHOST, () => {
    console.log(`http://${process.env.HOST}:${process.env.PORT}`);
});