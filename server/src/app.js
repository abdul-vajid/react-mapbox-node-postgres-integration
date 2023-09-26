import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import morgan from "morgan";
import { connectDatabase } from "./config/database.js";
import { router } from "./router/router.js";

const app = express();

connectDatabase()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const allowedOrigin = process.env.ALLOWED_ORIGIN.split(",");

const corsOptions = {
    origin: allowedOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/api", router);

app.use((err, req, res, next) => {
    console.log("500 err: ", err.message)
    res.status(404).json({ success: false, status: 500, message: "Something went wrong!" });
});

app.use((req, res) => {
    res.status(404).json({ success: false, status: 404, message: "Not found" });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(
        `The server connection is now established and running on port ${port}`
    );
});