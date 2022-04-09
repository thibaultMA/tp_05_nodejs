import { content, io } from "../app.js";
export let conf = (req, res) => {
  console.log(req.body.pseudo);
  let pseudo = req.body;
  res.render("index", { body: "chat", pseudo });
};
