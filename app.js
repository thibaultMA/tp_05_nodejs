import express from "express";
import { createServer } from "http";
import { router } from "./routes/user.js";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());

export let content = [{ pseudo: "UnKnowDed", content: "!! FIRST !!" }];

io.on("connection", (socket) => {
  socket.emit("first_content", content);
  socket.on("new_content", (data) => {
    io.emit("maj_content", data);
  });
});
app.get("/", (req, res) => {
  res.render("index", { body: "form" });
});
app.use("/", router);

let port = 3000;
httpServer.listen(port, () => {
  console.log("ca tourne ! sur l'url: ", "http://localhost:" + port);
});
