import { router } from "@/router";
import { initSocket } from "@/socket";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

app.use("/api", router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
