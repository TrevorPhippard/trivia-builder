import express from "express";

import cors from "cors";
import fileUpload from "express-fileupload";
import { createServer } from "http";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import compression from "compression";
import socketRoutes from "./routes/api/v1/socket";

import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import routes from "./routes";

dotEnv.config();

const app = express();
const port = 3000;
const socketPort = 3001;

app.use(cors());
app.use(compression());

app.use("/images", express.static("images"));
app.use("/uploads", express.static("uploads"));

/** ---------------------------------------------------------------------------
 *  @bodyparser
 * --------------------------------------------------------------------------- */

app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  express.static("public", {
    maxAge: "1d",
  })
);

app.use(
  fileUpload({
    limits: { fileSize: 250 * 1024 * 1024 },
  })
);

/** ---------------------------------------------------------------------------
 *  @Routes
 * --------------------------------------------------------------------------- */

app.use("/", routes);

app.use(function (req:any, res:any) {
  console.log(req.originalUrl);
  res.status(404).send({
    url: req.originalUrl + " not found",
  });
});

/** ---------------------------------------------------------------------------
 *  @Sockets
 * --------------------------------------------------------------------------- */

const socketServer = createServer(app);

const io = new Server(socketServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    allowedHeaders: ["socket-header"],
    credentials: true,
  },
  allowEIO3: true,
});

instrument(io, {
  auth: false,
  mode: "development",
});

io.use(async (socket: any, next: any) => {
  try {
    const token = socket.handshake.auth.token;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch (error: any) {
    return next(new Error(error.message));
  }
});

io.on("connection", (socket: any) => socketRoutes(io, socket));

socketServer.listen(socketPort, () => {
  console.log(`SOCKET listening on *:${socketPort}`);
});

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

export default app